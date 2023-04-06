import { ILesson } from "../lesson";

export interface ICourse {
    id: number;
    name: string;
    numberOfLessons: number;
    defaultLesson: ILesson;
    isPublic: boolean;
    color: string;
}

export interface IChapter {
    id: number;
    name: string;
    courseId: number;
    numberOfLessons: number;
    numberOfPractice: number;
    numberOfTests: number;
}