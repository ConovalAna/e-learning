import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, concatMap, tap } from 'rxjs';
import { CourseService } from 'src/app/shared/services/course';

interface CollaboratorAddProps {
  email: string;
  courseId: string;
}

@Component({
  selector: 'app-add-collaboration',
  templateUrl: './add-collaboration.component.html',
  styleUrls: ['./add-collaboration.component.scss']
})
export class AddCollaborationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CollaboratorAddProps,
    private courseService: CourseService,
    public dialogRef: MatDialogRef<AddCollaborationComponent>
  ) {
    if (this.data) {
      this.email = this.data.email;
      this.courseId = this.data.courseId;
    }
  }
  isEditMode: boolean = false;
  email: string = '';
  colId: string = '';
  courseId: string = '';
  unknownEmail: boolean = false;
  contactForm!: FormGroup;

  addCollaborator() {
    this.courseService.getCollaboratorByEmail(this.email)
      .pipe(
        tap((elem) => console.log('userIndex', elem)),
        concatMap((users: any) => {
          if (users.length) {
            this.colId = users[0].uid;
            this.unknownEmail = false;
            this.courseService.addCollaborator(this.courseId, users[0]).then(() => {
              debugger;
              this.dialogRef.close();
            });
            return EMPTY;
          } else {
            this.unknownEmail = true;
            return EMPTY;
          }
        })
      ).subscribe();
  }
}
