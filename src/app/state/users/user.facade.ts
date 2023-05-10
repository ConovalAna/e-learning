import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  defer,
  exhaustMap,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AppState } from '../state';
import { UserActions } from './user.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, UserRole, UserState } from './user.model';
import * as auth from 'firebase/auth';
import { fromUser } from './user.selector';

@Injectable()
export class UserFacade implements OnInitEffects {
  // ************************************************
  // Observable Queries available for consumption by views
  // ************************************************

  user$ = this.store.select(fromUser.selectUserState);
  onAuthStateChanged$ = this.afAuth.onAuthStateChanged;

  authToken$ = this.afAuth.authState.pipe(
    map((state) => {
      return state?.getIdToken();
    })
  );

  // ************************************************
  // Effects to be registered at the Module level
  // ************************************************

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      mergeMap(() =>
        this.afAuth.authState.pipe(
          map((authData: any) => {
            if (authData) {
              /// User logged in
              const auth = new Auth(authData.uid, authData.displayName ?? '');
              return UserActions.authenticated({ payload: auth });
            } else {
              /// User not logged in
              return UserActions.notAuthenticated({});
            }
          }),
          catchError((error) => of(UserActions.error({})))
        )
      )
    )
  );

  /**
   * Login with Google OAuth
   */

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.googleLogin),
      exhaustMap((actions) =>
        this.googleLogin()
          .then(() => UserActions.getUser({}))
          .catch((err) => UserActions.error({ payload: err.message }))
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap((action) =>
        this.afAuth
          .signOut()
          .then(() => UserActions.notAuthenticated({}))
          .catch((err) => UserActions.error({ payload: err.message }))
      )
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}

  ngrxOnInitEffects(): Action {
    return UserActions.getUser({});
  }

  /**
   *
   */
  loginWithGoogle(preferredRole: UserRole): Observable<UserState> {
    this.store.dispatch(
      UserActions.googleLogin({ payload: { preferredRole } })
    );
    return this.user$;
  }

  /**
   *
   */
  logout(): Observable<UserState> {
    this.store.dispatch(UserActions.logout({}));
    return this.user$;
  }

  async getAuthToken(): Promise<string | undefined> {
    const user = await this.afAuth.currentUser;
    return await user?.getIdToken();
  }

  // ******************************************
  // Internal Methods
  // ******************************************

  protected googleLogin(): Promise<any> {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }
}
