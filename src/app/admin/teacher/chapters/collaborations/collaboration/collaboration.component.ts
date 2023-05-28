import { Component } from '@angular/core';
import { AddCollaborationComponent } from '../add-collaboration/add-collaboration.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/shared/services/course';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.scss']
})
export class CollaborationComponent {

  public dragIconId!: string;
  public dropTileId!: string;
  public courseId: string;
  public collaborators: User[] = [];

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') ?? '';
    courseService.getCourseCollaborators(this.courseId).subscribe((result) => {
      this.collaborators = result
    });
  }

  // deleteLesson(lessonId: string) {
  //   let courseRouteId = this.route.snapshot.paramMap.get('courseId');
  //   this.lessonService
  //     .deleteLessonForChapter(lessonId, this.chapter?.id ?? '', courseRouteId ?? '')
  //     .subscribe((result) => {
  //       new Promise((res) => setTimeout(res, 500)).then(() => {
  //         this.updateLessons();
  //       });
  //     });
  // }

  openAddCollaborationDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    let courseRouteId = this.route.snapshot.paramMap.get('courseId');
    const dialogRef = this.dialog.open(AddCollaborationComponent, {
      data: {
        email: '',
        courseId: courseRouteId
      },
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(
      // (result) => {
      //   new Promise((res) => setTimeout(res, 500)).then(() => {
      //     this.updateLessons();
      //   });
      // }
    );
  }

  public onIconDropped(ev: any) {
    ev.drag.dropFinished();
  }

  // public onEnterHandler(ev: any): void {
  //   this.dropTileId = ev.owner.element.nativeElement.id;
  //   // the event gets raised immediately, but we want to swap only when we drag over another icon
  //   if (this.dragIconId === this.dropTileId) {
  //     return;
  //   }
  //   const dragIndex = this.lessons.findIndex(
  //     (iconObj) => iconObj.id === this.dragIconId
  //   );
  //   const dropIndex = this.lessons.findIndex(
  //     (iconObj) => iconObj.id === this.dropTileId
  //   );
  //   this.swapIcons(dragIndex, dropIndex);
  // }

  // public dragStartHandler(id: string): void {
  //   this.dragIconId = id;
  // }

}

