import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser, User, UserCredentials } from '../models/user.model';
import { Constants } from '../../../commons/constants/contants.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  apiUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  register(user: User): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/register', user);
  }

  login(credentials: UserCredentials): Observable<AuthUser> {
    return this.http.post<AuthUser>(this.apiUrl + '/login', credentials);
  }

  logout(): void {
    localStorage.removeItem(Constants.TOKEN_KEY);
    this.user$.next(null);
    this.checkAuthStatus();
    this.router.navigate(['auth', 'login']);
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem(Constants.TOKEN_KEY);
    this.isLoggedIn$.next(!!token);
    return this.isLoggedIn$;
  }
}
