import { createActionGroup, props } from '@ngrx/store';
import { Auth, UserRole } from './user.model';
import {
  LoginWithEmailModel,
  RegisterWithEmailModel,
} from 'src/app/shared/services/user';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    GetUser: props<{ payload?: any }>(),
    Authenticated: props<{ payload: Auth }>(),
    NotAuthenticated: props<{ payload?: any }>(),
    Error: props<{ payload?: any }>(),
    ProviderLogin: props<{ payload?: { provider: string } }>(),
    EmailLogin: props<{ payload?: LoginWithEmailModel }>(),
    Logout: props<{ payload?: any }>(),
    RegisterWithEmailAndPassword: props<{ payload?: RegisterWithEmailModel }>(),
  },
});
