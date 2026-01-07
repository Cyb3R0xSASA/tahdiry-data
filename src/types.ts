import { UUID } from "mongodb";

export interface IStage {
    name: string;
    id: number;
    status: boolean
    _id?: string;
}

export interface IGrade {
    id: number;
    json_id: number;
    id_enc: string;
    code_id: any;
    code_type: string;
    title: string;
    stage_id: number;
    stg_id?: string;
}

export interface ITerm {
    grade_id: string;
    id: number;
    item_index: number;
    title: string;
    codeId: string;
    codeType: string;
    fullPath: string;
    parentId: number;
    orderInParent: number;
    isParent: number;
    unitID: any;
    chapterId: any;
    directParentId: any;
}