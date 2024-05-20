import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Constants } from '../../../commons/constants/contants.enum';
import {
  AuthUser,
  User,
  UserCredentials,
  UserRole,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private _user: User | null = null;

  private _isLoggedIn: boolean = false;

  apiUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  private readTokens(): void {
    const token = localStorage.getItem(Constants.TOKEN_KEY);
    this._isLoggedIn = !!token;
    const userInfoString = localStorage.getItem(Constants.USER_INFO);
    this._user = userInfoString ? JSON.parse(userInfoString) : null;
  }

  private deleteTokens(): void {
    localStorage.removeItem(Constants.TOKEN_KEY);
    localStorage.removeItem(Constants.USER_INFO);
  }

  register(user: User): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/register', user);
  }

  login(credentials: UserCredentials): Observable<AuthUser> {
    return this.http.post<AuthUser>(this.apiUrl + '/login', credentials);
  }

  logout(): void {
    this.deleteTokens();
    this.readTokens();
    this.router.navigate(['auth', 'login']);
  }

  getUser(): User | null {
    this.readTokens();
    return this._user;
  }

  isLoggedIn(): boolean {
    this.readTokens();
    return this._isLoggedIn;
  }

  isAdmin() {
    return this._user?.role === UserRole.ADMIN;
  }
}
