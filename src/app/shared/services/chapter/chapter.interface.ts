export interface IChapter {
    id: string;
    name: string;
    description: string;
}

export interface IStudentChapter extends IChapter {
    block: boolean;
    pass: number;
}