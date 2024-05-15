import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Constants } from '../../../commons/constants/contants.enum';

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

  saveAppointment(appointment: Appointment): Observable<void> {
    return this.http.post<void>(this.apiUrl, appointment!);
  }

  updateAppointment(id: string, appointment: Appointment): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/' + id, appointment!);
  }

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }

  // private setHeaders() {
  //   let headers = new HttpHeaders();
  //   const token = localStorage.getItem(Constants.TOKEN_KEY) ?? '';
  //   headers = headers.set('Authorization', 'Bearer ' + token);
  //   return { headers };
  // }
}
