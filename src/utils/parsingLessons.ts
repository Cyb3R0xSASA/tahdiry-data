import * as cheerio from "cheerio";
import { IStageEntry } from "../types.js";

const parseHtmlString = (html: string): IStageEntry[] => {
    const $ = cheerio.load(html);
    const out: IStageEntry[] = [];
    $("div").each((_, el) => {
        const text = $(el).text().replace(/\s+/g, " ").trim();

        const parts = text.split("->").map(p => p.trim());

        const unit = parts[0] || undefined;
        const lesson = parts.slice(1).join("->") || undefined;

        out.push({ unit, lesson });
    })

    return out;
}

export default parseHtmlString;