export enum UserRole {
  Student,
  Teacher,
}

export interface IGoogleAuthData {
  uid?: string;
  displayName?: string;
}

export class Auth implements IGoogleAuthData {
  constructor(public uid: string, public displayName: string) {}
}

export class UserProfile {
  role: UserRole;
  /**
   *
   */
  constructor() {
    this.role = UserRole.Student;
  }
}

export class UserState {
  preferredRole: UserRole;
  auth: Auth;
  profile: UserProfile;
  loading: boolean;
  error: string;

  constructor() {
    this.preferredRole = UserRole.Student;
    this.auth = new Auth('', 'GUEST');
    this.profile = new UserProfile();
    this.loading = false;
    this.error = '';
  }
}
