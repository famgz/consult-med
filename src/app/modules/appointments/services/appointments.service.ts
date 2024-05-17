import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AddAppointment, Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  apiUrl = `${environment.API_URL}/appointments`;

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(this.apiUrl + '/' + id);
  }

  saveAppointment(appointment: AddAppointment): Observable<void> {
    return this.http.post<void>(this.apiUrl, appointment!);
  }

  updateAppointment(id: string, appointment: AddAppointment): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/' + id, appointment!);
  }

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }

  cancelAppointment(id: string): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/cancel/' + id, {});
  }

  doneAppointment(id: string): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/done/' + id, {});
  }

  // private setHeaders() {
  //   let headers = new HttpHeaders();
  //   const token = localStorage.getItem(Constants.TOKEN_KEY) ?? '';
  //   headers = headers.set('Authorization', 'Bearer ' + token);
  //   return { headers };
  // }
}
