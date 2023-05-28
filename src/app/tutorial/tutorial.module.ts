import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './lesson/lesson.component';
import { SlideWithChooseComponent } from './slides/slide-with-choose/slide-with-choose.component';
import { SlideWithInputsComponent } from './slides/slide-with-inputs/slide-with-inputs.component';
import { SlideWithVideoComponent } from './slides/slide-with-video/slide-with-video.component';
import { SlideWithIntroComponent } from './slides/slide-with-intro/slide-with-intro.component';
import { QuillReadOnlyConentComponent } from './quill-readonly-content/quill-readonly-content';
import { LottieModule } from 'ngx-lottie';
import { TestsComponent } from './test/tests/tests.component';
import { SmartbyteMaterialModule } from '../smartbyte-material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PracticeComponent } from './practice/practice.component';

@NgModule({
  declarations: [
    LessonComponent,
    SlideWithChooseComponent,
    SlideWithInputsComponent,
    SlideWithVideoComponent,
    SlideWithIntroComponent,
    QuillReadOnlyConentComponent,
    TestsComponent,
    PracticeComponent,
  ],
  imports: [
    CommonModule,
    LottieModule,
    SmartbyteMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [LessonComponent],
})
export class TutorialModule {}
