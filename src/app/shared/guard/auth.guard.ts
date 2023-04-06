import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { UserFacade } from 'src/app/state/users';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserFacade,
    public router: Router

  ) { }

  user$ = this.userService.user$;


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(
      obs => {
        this.user$.subscribe(response => {
          let user = response;
          if (!user?.auth?.uid) {
            this.router.navigate(['sign-in'])
            obs.next(false)
          }
          obs.next(true);
        })
      }
    )
  }
}
