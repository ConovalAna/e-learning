export interface ICourse {
    id: string;
    name: string;
    numberOfLessons: number;
    longDescription: string;
    shortDescription: string;
    duration: number;
    level: number;
    requirements: string;
    achievements: string;
}

export interface IChapter {
    id: number;
    name: string;
    courseId: number;
    numberOfLessons: number;
    numberOfPractice: number;
    numberOfTests: number;
}