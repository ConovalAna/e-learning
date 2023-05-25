import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginWithEmailModel } from 'src/app/shared/services/user';
import { UserFacade, UserRole } from 'src/app/state/users';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private userService: UserFacade, // Injects the default storage instance
    private formBuilder: FormBuilder
  ) {}

  loginForm = this.formBuilder.group<LoginWithEmailModel>({
    email: '',
    password: '',
  });

  user$ = this.userService.user$;
  preferredRole = UserRole.Student;

  changePreferredRole(type: UserRole) {
    this.preferredRole = type;
  }

  login() {
    this.userService.loginWithGoogle(this.preferredRole);
  }
  logout() {
    this.userService.logout();
  }

  loginWithEmail() {
    this.userService.loginWithEmail(
      this.loginForm.value as LoginWithEmailModel
    );
  }
  public get userRole(): typeof UserRole {
    return UserRole;
  }

  ngOnInit() {}
}
