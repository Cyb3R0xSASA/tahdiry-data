import { Env } from "./config/constants.conf.js";
import { IGrade, IStage, ITerm } from "./types.js";
import { decodeTahdiriTT } from "./utils/decode.js";
import mongoClient from "./config/db.conf.js";
import response from "./utils/response.js";
import { StageService } from "./service/stage.service.js";
import { Collection } from "mongodb";

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
        console.log(`Stage: {title: ${grad.title}} done`);
    }
}

// TODO: Scrape terms of grades
// TODO: Store terms in terms collection and make relation with grade {_id}

// TODO: Scrape subjects of term
// TODO: Clean the response of subjects data to [{lesson_from, lesson_to}]
// TODO: Store subjects in subjects collection and make relation with term {_id}

const run = async () => {
    const stages = StageService.getAll()
    const gradeDb = (await db).collection<IGrade>('grades');
    const termsDb = (await db).collection<ITerm>('terms');

    await grades(stages, gradeDb);
    await terms(gradeDb, termsDb)
}

await run();
