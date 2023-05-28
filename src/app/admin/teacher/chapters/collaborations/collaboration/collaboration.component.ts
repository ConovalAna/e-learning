import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/shared/services/course';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/services/user';
import { AddCollaborationComponent } from '../add-collaboration/add-collaboration.component';

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

  deleteCollaborator(userId: string) {
    this.courseService
      .deleteCollaborator(this.courseId ?? '', userId).then(() => {
        this.collaborators = this.collaborators.filter(function (value, index, arr) {
          return value.uid != userId;
        });
      }
      );
  }

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
}

