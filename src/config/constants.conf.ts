import 'dotenv/config'
export class Env {
    MONGO_URI: string = process.env.MONGO_URI ?? "mongodb://localhost:27017";
    DB_NAME: string = process.env.DB_NAME ?? "tahdiri";
    BASE_URL: string = process.env.BASE_URL ?? "https://q.tahdiri.com/tt/get.php?";
    SECOND_URL: string = process.env.SECOND_URL ?? "https://k.tahdiri.com/t/get.php?"
    // STAGES: IStage[] = readFileSync(DATA_PATH);
}
