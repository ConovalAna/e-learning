import { ISlide } from "../slide";

export interface ILesson {
    id: number,
    name: string;
    courseId: number;
    numberOfSlides: number;
    numberOfDocuments: number;
    numberOfNotes: number;
    numberOfCollaborators: number;
    slides?: ISlide[];
}