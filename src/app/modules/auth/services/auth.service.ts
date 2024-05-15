import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AuthUser, User, UserCredentials } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/register', user);
  }

  login(credentials: UserCredentials): Observable<AuthUser> {
    return this.http.post<AuthUser>(this.apiUrl + '/login', credentials);
  }
}
