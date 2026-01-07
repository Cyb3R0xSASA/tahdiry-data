import fs from "fs";
import path from "path";
import { IStage } from "../types.js";

const DATA_PATH = path.resolve(process.cwd(), "src/data.json");

export class StageService {
    static getAll(): IStage[] {
        const raw = fs.readFileSync(DATA_PATH, "utf-8");
        return JSON.parse(raw);
    }

    static saveAll(stages: IStage[]): void {
        fs.writeFileSync(
            DATA_PATH,
            JSON.stringify(stages, null, 2),
            "utf-8"
        );
    }

    static updateStage(id: number, updates: Partial<IStage>): IStage {
        const stages = this.getAll();

        const index = stages.findIndex(s => s.id === id);
        if (index === -1) {
            throw new Error("Stage not found");
        }

        stages[index] = { ...stages[index], ...updates };

        this.saveAll(stages);
        return stages[index];
    }

    static addStage(stage: IStage): IStage {
        const stages = this.getAll();
        stages.push(stage);
        this.saveAll(stages);
        return stage;
    }
}
