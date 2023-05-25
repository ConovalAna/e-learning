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
export class AuthGuard implements CanActivate {
  constructor(private userService: UserFacade, public router: Router) { }

  onAuthStateChanged$ = this.userService.onAuthStateChanged$;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.onAuthStateChanged$((user) => {
        if (!user) {
          this.router.navigate(['sign-in']);
          console.log(user);
          obs.next(false);
        }
        obs.next(true);
      });
    });
  }
}
