import { Env } from "./config/constants.conf.js";
import { IGrade, ILessons, IStage, IStageEntry, ISubject, ITerm } from "./types.js";
import { decodeTahdiriTT } from "./utils/decode.js";
import mongoClient from "./config/db.conf.js";
import response from "./utils/response.js";
import { StageService } from "./service/stage.service.js";
import { Collection } from "mongodb";
import parseHtmlString from "./utils/parsingLessons.js";
import { isAxiosError } from "axios";

const env = new Env();
const db = mongoClient(env);

// TODO:  Scrape stages with id [1, 2,3 ,5,6]
// TODO: Save stages data in stages collection
const grades = async (stages: IStage[], gradeDb: Collection<IGrade>) => {
    for (const stage of stages) {
        const res = await response(`${env.BASE_URL}stage_id=${stage.id}`, 'GET')
        const grades: { data: IGrade[] } = decodeTahdiriTT(res);
        for (const grad of grades.data) {
            const isGrade = await gradeDb.findOne({ $and: [{ id: grad.id }, { stage_id: grad.stage_id }] });
            if (!isGrade) {
                await gradeDb.insertOne({ ...grad, stg_id: stage._id });
                console.log(`Successful insert stage: {title: ${grad.stage_id}, id: ${grad.id}}`)
            }
        }
        console.log(`Stage: {title: ${stage.name}} done`);
    }
}

// TODO: Scrape grades of stages
// TODO: Store grades in grades  collection and make relation with stage {_id}
const terms = async (gradeDb: Collection<IGrade>, termsDb: Collection<ITerm>) => {
    const grades = await gradeDb.find().toArray();
    for (const grad of grades) {
        const res = await response(`${env.BASE_URL}grade_id=${grad.id}`, 'GET');
        const terms: { data: ITerm[] } = decodeTahdiriTT(res);
        for (const term of terms.data) {
            const isTerm = await termsDb.findOne({ item_index: term.id });
            if (!isTerm) {
                await termsDb.insertOne({ ...term, grade_id: grad._id.toString() });
                console.log(`Successful insert term: {title: ${term.title}, id: ${grad.id}}`);
            }
        }
        console.log(`Grade: {title: ${grad.title}} done`);
    }
}

// TODO: Scrape terms of grades
// TODO: Store terms in terms collection and make relation with grade {_id}
const subjects = async (termsDb: Collection<ITerm>, subjectDb: Collection<ISubject>) => {
    const terms = await termsDb.find().toArray();
    for (const term of terms) {
        const res = await response(`${env.SECOND_URL}term_id=${term.id}`, 'GET');
        const subjects: { data: ISubject[] } = decodeTahdiriTT(res);
        for (const subject of subjects.data) {
            const isSubject = await subjectDb.findOne({ id: subject.id });
            if (!isSubject) {
                await subjectDb.insertOne({ ...subject, term_id: term._id.toString() });
                console.log(`Successful insert subject: {title: ${subject.title}, id: ${subject.id}}`);
            }
        }
        console.log(`Term: {title: ${term.title}} done`);
    }
}


// TODO: Scrape subjects of term
// TODO: Clean the response of subjects data to [{lesson_from, lesson_to}]
// TODO: Store subjects in subjects collection and make relation with term {_id}
const lessons = async (subjectDb: Collection<ISubject>, lessonDb: Collection<ILessons>) => {
    const subjects = await subjectDb.find().toArray();
    for (const { parent_id, id, title } of subjects) {
        try {
            const isLesson = await lessonDb.findOne({ subject_id: id, term_id: parent_id });
            console.log(isLesson)
            if (!isLesson) {
                const url =
                    `${env.SECOND_URL}` +
                    `p_subj=${encodeURIComponent(id as string)}` +
                    `&ex_sem_id=${parent_id}` +
                    `&a=p`;

                const res = await response(url, 'GET');
                const lessons: string[] = decodeTahdiriTT(res);
                let result: IStageEntry[][] = [];
                for (const lesson of lessons) {
                    const week = parseHtmlString(lesson);
                    result.push(week)
                }
                await lessonDb.insertOne({ weeks: result, subject_id: id, term_id: (parent_id as number) })
            }
            console.log(`Lesson: {subject: ${title}, term: ${parent_id}}`)
        } catch (err: any) {
            if (isAxiosError(err)) {
                if (err.code === 'ECONNABORTED') {
                    console.error('Request timed out ⏱️');
                } else {
                    console.error('Axios error:', err.message);
                }
            } else {
                console.error('Unknown error:', err);
            }
        }

    }
}


const run = async () => {
    const stages = StageService.getAll()
    const gradeDb = (await db).collection<IGrade>('grades');
    const termsDb = (await db).collection<ITerm>('terms');
    const subjectsDb = (await db).collection<ISubject>('subjects');
    const lessonsDb = (await db).collection<ILessons>('lessons');

    await grades(stages, gradeDb);
    await terms(gradeDb, termsDb);
    await subjects(termsDb, subjectsDb);
    await lessons(subjectsDb, lessonsDb)
}

await run();
