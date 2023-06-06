import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  defer,
  EMPTY,
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
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, UserRole, UserState } from './user.model';
import * as auth from 'firebase/auth';
import { fromUser } from './user.selector';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  LoginWithEmailModel,
  RegisterWithEmailModel,
  User,
} from 'src/app/shared/services/user';

@Injectable()
export class UserFacade implements OnInitEffects {
  // ************************************************
  // Observable Queries available for consumption by views
  // ************************************************

  /**
   *
   */
  user$ = this.store.select(fromUser.selectUserState);
  onAuthStateChanged$ = this.afAuth.onAuthStateChanged;

  authToken$ = this.afAuth.authState.pipe(
    map((state) => {
      return state?.getIdToken();
    })
  );

  userProfile$ = (uid: string) =>
    this.afs.doc<User>(`users/${uid}`).snapshotChanges();

  // ************************************************
  // Effects to be registered at the Module level
  // ************************************************

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getuser),
      mergeMap(() =>
        this.afAuth.authState.pipe(
          map((authData: firebase.default.User | null) => {
            if (authData) {
              /// User logged in
              console.log('test');
              console.log(authData);
              this.setUserData(authData).then();

              const auth = new Auth(authData.uid, authData.displayName ?? '');
              return UserActions.authenticated({ payload: auth });
            } else {
              /// User not logged in
              return UserActions.notauthenticated({});
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
      ofType(UserActions.providerlogin),
      exhaustMap((actions) => {
        if (actions.payload?.provider == 'google')
          return this.googleLogin()
            .then(() => UserActions.getuser({}))
            .catch((err) => UserActions.error({ payload: err.message }));
        else if (actions.payload?.provider == 'github')
          return this.githubLogin()
            .then(() => UserActions.getuser({}))
            .catch((err) => UserActions.error({ payload: err.message }));
        else if (actions.payload?.provider == 'facebook') {
          return this.facebookLogin()
            .then(() => UserActions.getuser({}))
            .catch((err) => UserActions.error({ payload: err.message }));
        } else return EMPTY;
      })
    )
  );

  /**
   * Login with Google OAuth
   */

  loginWithEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.emaillogin),
      exhaustMap((actions) =>
        this.emailLogin(actions.payload?.email, actions.payload?.password)
          .then(() => UserActions.getuser({}))
          .catch((err) => UserActions.error({ payload: err.message }))
      )
    )
  );

  registerWithEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerwithemailandpassword),
      exhaustMap(({ payload }) =>
        this.registerWithEmail(payload)
          .then(() => UserActions.getuser({}))
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
          .then(() => UserActions.notauthenticated({}))
          .catch((err) => UserActions.error({ payload: err.message }))
      )
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public authSerive: AuthService
  ) {}

  ngrxOnInitEffects(): Action {
    return UserActions.getuser({});
  }

  /**
   *
   */
  loginWithProvider(provider: string): Observable<UserState> {
    this.store.dispatch(
      UserActions.providerlogin({ payload: { provider: provider } })
    );
    return this.user$;
  }

  /**
   *
   */
  loginWithEmail(model: LoginWithEmailModel): Observable<UserState> {
    this.store.dispatch(UserActions.emaillogin({ payload: model }));
    return this.user$;
  }

  /**
   *
   */
  signUpWithEmailAndPassword(registerModel: RegisterWithEmailModel) {
    this.store.dispatch(
      UserActions.registerwithemailandpassword({ payload: registerModel })
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

  protected facebookLogin(): Promise<any> {
    const provider = new auth.FacebookAuthProvider();
    provider.addScope('email');
    return this.afAuth.signInWithPopup(provider);
  }

  protected githubLogin(): Promise<any> {
    const provider = new auth.GithubAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  protected emailLogin(email?: string, password?: string): Promise<any> {
    if (email && password)
      return this.afAuth.signInWithEmailAndPassword(email, password);
    throw Error('Empty email/pasword');
  }

  // Sign up with email/password
  protected registerWithEmail(
    registerModel: RegisterWithEmailModel | undefined
  ) {
    if (!registerModel) throw Error('Not registered');
    return this.afAuth
      .createUserWithEmailAndPassword(
        registerModel.email,
        registerModel.password
      )
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
        // this.SendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    await userRef.get().subscribe((value) => {
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      if (!value.exists || !value.get('role')) {
        userData.role = 'student';
      }
      userRef.set(userData, {
        merge: true,
      });
    });
  }

  searchUsersByIds(userIds: string[]) {
    return this.afs
      .collection<User>('users', (ref) => ref.where('uid', 'in', userIds))
      .get()
      .pipe(
        map((snapshot) => {
          return snapshot.docs.map((doc) => doc.data());
        })
      );
  }
}
