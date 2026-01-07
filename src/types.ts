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
    codeId: string;
    codeType: string;
    title: string;
    itemId: any;
    orderInParent: number;
    imagePath: string;
    hDate: string;
    gDate: string;
    gender: string;
    unitID: any;
    chapterId: any;
    description: string;
    fullPath: string;
    isActive: number;
    subjectGroupId: number;
    teacherGuidCount: number;
    hasTeacherGuides: number;
    hasSubjectBooks: number;
    linkable: number;
    flashActivityCount: number;
    questionsCount: number;
    subjectBooksCount: number;
    books: any;
    directParentId: number;
    termOrder: number;
}

export interface ISubject {
    term_id: string;
    id: number;
    title: string;
    parent_type: string;
    parent_id: number;
    is_extra: boolean;
}