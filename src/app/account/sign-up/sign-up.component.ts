import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegisterWithEmailModel } from 'src/app/shared/services/user';
import { UserFacade, UserRole } from 'src/app/state/users';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private userFacade: UserFacade,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void { }

  user$ = this.userFacade.user$;
  preferredRole = UserRole.Student;

  registerForm = this.formBuilder.group<RegisterWithEmailModel>({
    firstName: '',
    email: '',
    lastName: '',
    password: '',
  });

  changePreferredRole(type: UserRole) {
    this.preferredRole = type;
  }

  registerWithGoogle() {
    this.userFacade.loginWithProvider('google');
  }

  registerWithFacebook() {
    this.userFacade.loginWithProvider('facebook');
  }

  registerWithGithub() {
    this.userFacade.loginWithProvider('github');
  }

  registerWithEmail() {
    this.userFacade.signUpWithEmailAndPassword(
      this.registerForm.value as RegisterWithEmailModel
    );
  }

  public get userRole(): typeof UserRole {
    return UserRole;
  }
}
