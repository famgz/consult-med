export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AddUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserDomain {
  id: string;
  name: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  user: User;
  token: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
