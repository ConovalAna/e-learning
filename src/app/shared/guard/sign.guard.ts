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
  user$ = this.userService.user$;
  userProfile$ = this.userService.userProfile$;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.user$
        .pipe(
          mergeMap((user) => {
            if (user?.auth?.uid) return this.userProfile$(user?.auth?.uid);
            else {
              obs.next(true);
              return EMPTY;
            }
          })
        )
        .subscribe((docUserProfile) => {
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
    });
  }
}
