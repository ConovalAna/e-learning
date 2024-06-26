export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  role?: string;
}

export interface RegisterWithEmailModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginWithEmailModel {
  email: string;
  password: string;
}

export interface RegisterUserModel {
  email: string;
  phoneNumber?: string;
  displayName: string;
  emailVerified: boolean;
  photoUrl: string;
  disabled: boolean;
  password: string;
}

export interface RegisterUserResponseModel {
  uid: string;
  email: string;
  phoneNumber: string;
  displayName: string;
  emailVerified: boolean;
  photoUrl: string;
  disabled: boolean;
  password: string;
}
