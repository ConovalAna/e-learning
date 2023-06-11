import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ICourse,
  ICourseCollaborations,
  dbCourseToICourse,
} from './course.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import {
  combineLatest,
  filter,
  map,
  merge,
  mergeMap,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../user';
import { ITestStatistic } from './course-statistic.interface';
import { dbTestSlideToITestSlide } from '../slide';

const queryKeys = {
  teacherCourses: 'teacher-courses',
  studentSubscribedCourses: 'student-subscribed-courses',
};

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);
  private queryClient = inject(QueryClientService);
  constructor(private http: HttpClient, public afs: AngularFirestore) {}

  apiUrl = 'https://localhost:44302/Courses/';
  userCourseApiUrl = 'https://localhost:44302/UserCourses';

  getAllCourses() {
    return this.http.get<ICourse[]>(this.apiUrl);
  }

  getCourseById(id: string) {
    return this.http.get<ICourse>(this.apiUrl + id);
  }

  getAllPagedFilteredCourses(search: string, offset: number, limit: number) {
    return this.http.get<ICourse[]>(
      this.apiUrl +
        'search?query=' +
        search +
        '&offset=' +
        offset +
        '&limit=' +
        limit
    );
  }

  /// Teacher region

  getAllTeacherCourses() {
    return this.useQuery(
      [queryKeys.teacherCourses],
      () => {
        return this.http.get<ICourse[]>(this.apiUrl + 'for-teacher');
      },
      { staleTime: Infinity, retry: 3 }
    );
  }

  addCourseByTeacher() {
    return this.useMutation((course: ICourse) => {
      return this.http.post<IdResult<string>>(this.apiUrl, course).pipe(
        tap((result) => {
          // Invalidate to refetch
          this.queryClient.invalidateQueries([queryKeys.teacherCourses]);
        })
      );
    });
  }

  updateCourseByTeacher() {
    return this.useMutation((course: ICourse) => {
      return this.http.put<any>(this.apiUrl, course).pipe(
        tap((result) => {
          // Invalidate to refetch
          this.queryClient.invalidateQueries([queryKeys.teacherCourses]);
        })
      );
    });
  }

  deleteCourseByTeacher() {
    return this.useMutation((courseId: string) => {
      return this.http.delete<any>(this.apiUrl + courseId).pipe(
        tap((result) => {
          // Invalidate to refetch
          this.queryClient.invalidateQueries([queryKeys.teacherCourses]);
        })
      );
    });
  }

  addCollaborator(courseId: string, user: User) {
    const courseCollaboratorsRef = this.afs
      .doc<ICourse>(`CourseModel/${courseId}`)
      .collection('collaborators')
      .doc(user.uid);

    const userCourseCollaboratorsRef = this.afs
      .doc<ICourseCollaborations>(`CollaborationCourseModel/${user.uid}`)
      .collection('CoursesCollaborattions')
      .doc(courseId);

    userCourseCollaboratorsRef.set(
      { id: courseId },
      {
        merge: true,
      }
    );

    return courseCollaboratorsRef.set(user, {
      merge: true,
    });
  }

  getCollaboratorByEmail(collaboratorEmail: string) {
    {
      const users$ = this.afs
        .collection<User>('users', (ref) =>
          ref.where('email', '==', collaboratorEmail)
        )
        .valueChanges();
      return users$;
    }
  }

  getCourseCollaborators(courseId: string) {
    {
      const collection = this.afs
        .collection<User>(`CourseModel/${courseId}/collaborators`)
        .valueChanges();
      return collection;
    }
  }

  async deleteCollaborator(courseId: string, userId: string) {
    await this.afs
      .doc<ICourse>(`CourseModel/${courseId}`)
      .collection('collaborators')
      .doc(userId)
      .delete();

    await this.afs
      .doc<ICourseCollaborations>(`CollaborationCourseModel/${userId}`)
      .collection('CoursesCollaborattions')
      .doc(courseId)
      .delete();
  }

  getCollaborativeCourses(userId: string) {
    {
      const collection = this.afs
        .collection<ICourseCollaborations>(
          `CollaborationCourseModel/${userId}/CoursesCollaborattions`
        )
        .valueChanges()
        .pipe(
          switchMap((courseCollaboration) => {
            let courses$ = courseCollaboration.map((element) =>
              this.afs
                .doc<any>(`CourseModel/${element.id}`)
                .valueChanges()
                .pipe(map((course) => dbCourseToICourse(course)))
            );
            return zip(courses$);
          })
        );
      return collection;
    }
  }

  addTestAnswer(
    courseId: string,
    testId: string,
    testStatistic: ITestStatistic
  ) {
    const courseStatisticsRef = this.afs.doc(
      `UserCourseStatisticSetModel/${courseId}/TestStatisticsSetModel/${testId}`
    );
    courseStatisticsRef.set(
      { id: testId },
      {
        merge: true,
      }
    );
    return courseStatisticsRef
      .collection('TestStatisticsModel')
      .add(testStatistic);
  }

  getCoursesTests(courseId: string) {
    const testsCollection = this.afs
      .collection<any>(`CourseModel/${courseId}/ChapterModel`)
      .valueChanges()
      .pipe(
        switchMap((chapterModel) => {
          let tests$ = chapterModel.map((element) =>
            this.afs
              .collection<any>(`TestSetModel/${element.Id}/TestModel`)
              .valueChanges()
              .pipe(
                map((tests) =>
                  tests.map((test) => {
                    return {
                      testId: test.Id,
                      testName: test.Name,
                      testOrder: test.Order,
                      chapterId: element.Id,
                      chapterName: element.Name,
                    };
                  })
                )
              )
          );
          return combineLatest(tests$);
        })
      )
      .pipe(
        switchMap((testModel) => {
          let tests$ = testModel
            .flatMap((i) => i)
            .map((element) =>
              this.afs
                .collection<any>(
                  `TestSlideSetModel/${element.testId}/TestSlideModel`
                )
                .valueChanges()
                .pipe(
                  map((testsSlide) =>
                    testsSlide.map((testSlide) => {
                      return {
                        testId: element.testId,
                        testName: element.testName,
                        chapterId: element.chapterId,
                        testOrder: element.testOrder,
                        chapterName: element.chapterName,
                        slide: dbTestSlideToITestSlide(testSlide),
                      };
                    })
                  )
                )
            );
          return combineLatest(tests$);
        })
      );

    return testsCollection;
  }

  getCoursesTestsStatistics(courseId: string) {
    const testsCollection = this.afs
      .collection<any>(
        `UserCourseStatisticSetModel/${courseId}/TestStatisticsSetModel`
      )
      .valueChanges()
      .pipe(
        switchMap((testsModel) => {
          let tests$ = testsModel.map((element) =>
            this.afs
              .collection<ITestStatistic>(
                `UserCourseStatisticSetModel/${courseId}/TestStatisticsSetModel/${element.id}/TestStatisticsModel`
              )
              .valueChanges()
              .pipe(map((tests) => tests.map((test) => test)))
          );
          return combineLatest(tests$);
        })
      );

    return testsCollection;
  }
}

// .pipe(
//   switchMap((testModel) => {
//     let testData$ = testModel.map((element) =>
//       this.afs
//         .doc<any>(`TestSlideSetModel/${element.testId}`)
//         .valueChanges()
//         .pipe(map((test) => { testId: test.Id; chapterId: element.Id }))
//     );
//     return zip(tests$).
//   })

// async addCollaborator(courseId: string, collaboratorEmail: string) {
//   {
//     const course$ = this.afs.doc<ICourse>(
//       `CourseModel/${courseId}`
//     ).valueChanges();

//     const users$ = this.afs.collection<User>('users', ref => ref.where('email', '==', collaboratorEmail)).valueChanges();

//     zip([course$, users$]).pipe(filter(values => !!values)).subscribe(values => {
//       const [course, users] = values;
//       if (users.length) {
//         this.updateCourseCollaborators(courseId, users[0]).then();
//       }
//     })
//   }
// }
