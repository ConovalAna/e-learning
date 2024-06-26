import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './services/course';
import { LessonService } from './services/lesson';
import { SlideService } from './services/slide';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AvatarImageComponent } from './components/avatar-image/avatar-image.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/enviorment/enviorment';
import { CloudStorageService } from './services/firebase';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AuthInterceptorService } from './interceptors/auth.interceptor';
import { UserCourseService } from './services/course/user-course.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { TestService } from './services/test';
import { FooterComponent } from './components/footer/footer.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { SmartbyteMaterialModule } from '../smartbyte-material.module';
import { MatIconModule } from '@angular/material/icon';
import { QuestService } from './services/quests';

@NgModule({
  declarations: [AvatarImageComponent, FooterComponent, FileUploaderComponent],
  imports: [
    MatIconModule,
    CommonModule,
    HttpClientModule,
    SmartbyteMaterialModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => {
      const storage = getStorage();
      console.log(storage);

      return storage;
    }),
  ],
  exports: [AvatarImageComponent, FooterComponent, FileUploaderComponent],
  providers: [
    CourseService,
    UserCourseService,
    LessonService,
    SlideService,
    CloudStorageService,
    TestService,
    QuestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
