import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { EMPTY, Observable, combineLatest, mergeMap } from 'rxjs';
import { UserFacade, UserRole } from 'src/app/state/users';

@Injectable({
  providedIn: 'root',
})
export class SignGuard implements CanActivate {
  constructor(private userService: UserFacade, public router: Router) {}
  onAuthStateChanged$ = this.userService.onAuthStateChanged$;
  userProfile$ = this.userService.userProfile$;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.onAuthStateChanged$((user) => {
        if (user) {
          this.userProfile$(user.uid).subscribe((docUserProfile) => {
            if (docUserProfile?.payload?.exists) {
              let role = docUserProfile.payload.get('role');
              if (role === 'student') {
                this.router.navigate(['student']);
              } else if (role === 'teacher') {
                this.router.navigate(['admin']);
              }
              obs.next(false);
            }
            obs.next(true);
          });
        }
        obs.next(true);
      });
    });
  }
}
