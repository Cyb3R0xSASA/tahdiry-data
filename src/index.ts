import { Env } from "./config/constants.conf.js";
import { IGrade, IStage } from "./types.js";
import { decodeTahdiriTT } from "./utils/decode.js";
import mongoClient from "./config/db.conf.js";
import response from "./utils/response.js";
import { StageService } from "./service/stage.service.js";

const env = new Env();
const db = mongoClient(env);

// TODO:  Scrape stages with id [1, 2,3 ,5,6]
// TODO: Save stages data in stages collection
const grades = async (stages: IStage[]) => {
    for (const stage of stages) {
        const res = await response(`${env.BASE_URL}stage_id=${stage.id}`, 'GET')
        const grades: { data: IGrade[] } = decodeTahdiriTT(res);
        const gradeDb = (await db).collection<IGrade>('grades');
        for (const grad of grades.data) {
            const isGrade = await gradeDb.findOne({ $and: [{ id: grad.id }, { stage_id: grad.stage_id }] });
            if (!isGrade) {
                await gradeDb.insertOne({ ...grad,  stg_id: stage._id});
                console.log(`Successful insert stage: {title: ${grad.stage_id}, id: ${grad.id}}`)
            }
        }
        console.log(`Stage: {title: ${stage.name}} done`);
    }
}

// TODO: Scrape grades of stages
// TODO: Store grades in grades  collection and make relation with stage {_id}

// TODO: Scrape terms of grades
// TODO: Store terms in terms collection and make relation with grade {_id}

// TODO: Scrape subjects of term
// TODO: Clean the response of subjects data to [{lesson_from, lesson_to}]
// TODO: Store subjects in subjects collection and make relation with term {_id}

const run = async () => {
    const stages = StageService.getAll()
    await grades(stages);
}

await run();
