export interface ICourse {
    id: string;
    name: string;
    imageUrl: string;
    shortDescription: string;
    longDescription: string;
    duration: number;
    requirements: string;
    achievements: string;
    level: number;

    numberOfLessons: number;
}

export interface IChapter {
    id: number;
    name: string;
    courseId: number;
    numberOfLessons: number;
    numberOfPractice: number;
    numberOfTests: number;
}