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
  visible: boolean;
  archived: boolean;
  diplomaUrl: string;
}

export function dbCourseToICourse(dbcourse: any): ICourse {
  return {
    id: dbcourse.Id,
    name: dbcourse.Name,
    imageUrl: dbcourse.ImageUrl,
    shortDescription: dbcourse.ShortDescription,
    longDescription: dbcourse.LongDescription,
    duration: dbcourse.Duration,
    requirements: dbcourse.Requirements,
    achievements: dbcourse.Achievements,
    level: dbcourse.Level,
    numberOfLessons: dbcourse.NumberOfLessons,
    visible: dbcourse.Visible,
    archived: dbcourse.Archived,
    diplomaUrl: dbcourse.diplomaUrl,
  };
}

export interface IStudentCourse extends ICourse {
  joined: boolean;
}

export interface ICourseCollaborations {
  id: string; //userId
}

export interface IUserCourseCollaborations {
  id: string; //courseId
}
