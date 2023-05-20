export interface IChapter {
    id: string;
    name: string;
    description: string;
    visible: boolean;
}

export interface IStudentChapter extends IChapter {
    block: boolean;
    pass: number;
}