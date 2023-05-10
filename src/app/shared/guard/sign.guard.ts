import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserFacade, UserRole } from 'src/app/state/users';

@Injectable({
  providedIn: 'root',
})
export class SignGuard implements CanActivate {
  constructor(private userService: UserFacade, public router: Router) {}
  user$ = this.userService.user$;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.user$.subscribe((response) => {
        let user = response;
        if (user?.auth?.uid) {
          if (user.preferredRole === UserRole.Student) {
            this.router.navigate(['admin']);
          } else if (user.preferredRole === UserRole.Teacher) {
            this.router.navigate(['admin']);
          }
          obs.next(false);
        }
        obs.next(true);
      });
    });
  }
}
