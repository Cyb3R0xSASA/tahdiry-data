import { Db, MongoClient } from "mongodb";
import { Env } from "./constants.conf.js";

const mongoClient = async (env: Env): Promise<Db> => {
    const mongoUri = env.MONGO_URI;
    const dbName = env.DB_NAME;
    const client = new MongoClient(mongoUri);

    await client.connect();
    const db: Db = client.db(dbName);
    return db;
}

export default mongoClient;