import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './services/course';
import { LessonService } from './services/lesson';
import { SlideService } from './services/slide';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AvatarImageComponent } from './components/avatar-image/avatar-image.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/enviorment/enviorment';
import { CloudStorageService } from './services/firebase';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AuthInterceptorService } from './interceptors/auth.interceptor';
import { UserCourseService } from './services/course/user-course.service';

@NgModule({
  declarations: [AvatarImageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => {
      const storage = getStorage();
      console.log(storage);

      return storage;
    }),
  ],
  exports: [AvatarImageComponent],
  providers: [
    CourseService,
    UserCourseService,
    LessonService,
    SlideService,
    CloudStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class SharedModule {}
