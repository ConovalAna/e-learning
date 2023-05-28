import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICourse, ICourseCollaborations } from './course.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { combineLatest, filter, merge, tap, zip } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../user';

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
  constructor(private http: HttpClient,
    public afs: AngularFirestore) { }

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

  addCollaborator(courseId: string, user: User) {

    const courseCollaboratorsRef = this.afs.doc<ICourse>(
      `CourseModel/${courseId}`
    ).collection("collaborators").doc(user.uid);

    const userCourseCollaboratorsRef = this.afs.doc<ICourseCollaborations>(
      `CollaborationCourseModel/${user.uid}`
    ).collection("CoursesCollaborattions").doc(courseId);

    userCourseCollaboratorsRef.set({ id: courseId }, {
      merge: true,
    })

    return courseCollaboratorsRef.set(user, {
      merge: true,
    });
  }

  getCollaboratorByEmail(collaboratorEmail: string) {
    {
      const users$ = this.afs.collection<User>('users', ref => ref.where('email', '==', collaboratorEmail)).valueChanges();
      return users$;
    }
  }

  getCourseCollaborators(courseId: string) {
    {
      debugger;
      const collection = this.afs.collection<User>(`CourseModel/${courseId}/collaborators`).valueChanges();
      return collection;
    }

    //   const collectionRef: AngularFirestoreCollection<User> = this.afs.collection<User>(`CourseModel/${courseId}/collaborators`);
    // return collectionRef.snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data() as User;
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    // );

  }
}
