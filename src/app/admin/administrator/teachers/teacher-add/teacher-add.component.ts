import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterUserModel, User } from 'src/app/shared/services/user';
import { UserFacade } from 'src/app/state/users';

interface UserAddProps {
  user: User;
}

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.scss'],
})
export class TeacherAddComponent {
  isEditMode: boolean = false;
  user: RegisterUserModel = {
    displayName: '',
    email: '',
    emailVerified: true,
    photoUrl: '',
    disabled: false,
    password: '',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserAddProps,
    private userService: UserFacade
  ) {}

  updateUser() {}
  addUser() {
    this.userService.registerUserFromAdmin(this.user);
  }
}
