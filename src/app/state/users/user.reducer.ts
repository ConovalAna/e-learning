import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.model';

export const initialState = new UserState();

export const userReducer = createReducer(
  initialState,
  on(UserActions.getuser, (_state) => {
    return { ..._state, loading: true };
  }),
  on(UserActions.authenticated, (_state, { payload }) => {
    return { ..._state, auth: payload, loading: false };
  }),
  on(UserActions.notauthenticated, (_state) => {
    return { ..._state, ...initialState, loading: false };
  }),
  on(UserActions.googlelogin, (_state, { payload }) => {
    return { ..._state, ...payload, loading: true };
  }),
  on(UserActions.error, (_state, { payload }) => {
    return { ..._state, ...payload, loading: false };
  }),
  on(UserActions.logout, (_state) => {
    return { ..._state, loading: true };
  }),

  on(UserActions.registerwithemailandpassword, (_state) => {
    return { ..._state, loading: true };
  })
);

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
});
