import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserFacade, UserRole } from 'src/app/state/users';

interface RegisterWithEmailModel {
  firstName: string,
  lastName: string,
  email: string,
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private userService: UserFacade,
  ) { }
  ngOnInit(): void {
  }

  user$ = this.userService.user$;
  preferredRole = UserRole.Student;
  registerModel: RegisterWithEmailModel = {
    firstName: "",
    email: "",
    lastName: "",
    password: ""
  }

  changePreferredRole(type: UserRole) {
    this.preferredRole = type;
  }


  registerWithGoogle() { this.userService.loginWithGoogle(this.preferredRole) }
  registerWithEmail(firstName: string,) { }

  public get userRole(): typeof UserRole {
    return UserRole;
  }

}
