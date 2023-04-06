import { createActionGroup, props } from '@ngrx/store';
import { Auth, UserRole } from './user.model';


export const UserActions = createActionGroup({
    source: 'User',
    events: {
        'Get user': props<{ payload?: any }>(),
        'Authenticated': props<{ payload: Auth }>(),
        'Not Authenticated': props<{ payload?: any }>(),
        'Error': props<{ payload?: any }>(),
        'Google login': props<{ payload?: { preferredRole: UserRole } }>(),
        'Logout': props<{ payload?: any }>(),
    },
});
