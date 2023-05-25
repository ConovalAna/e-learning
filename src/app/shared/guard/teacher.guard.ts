import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserFacade } from 'src/app/state/users';

@Injectable({
  providedIn: 'root',
})
export class TeacherGuard implements CanActivate {
  constructor(private userService: UserFacade, public router: Router) {}

  onAuthStateChanged$ = this.userService.onAuthStateChanged$;
  userProfile$ = this.userService.userProfile$;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.onAuthStateChanged$((user) => {
        if (!user) {
          this.router.navigate(['sign-in']);
          obs.next(false);
        } else {
          this.userProfile$(user.uid).subscribe((docUserProfile) => {
            if (docUserProfile?.payload?.exists) {
              let role = docUserProfile.payload.get('role');
              if (role !== 'teacher') {
                if (role === 'student') this.router.navigate(['student']);
                else this.router.navigate(['no-role']);
              }
            }
          });
        }
        obs.next(true);
      });
    });
  }
}
