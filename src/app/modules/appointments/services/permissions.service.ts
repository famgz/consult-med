import { Injectable } from '@angular/core';
import { UserRole } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Appointment, AppointmentStatus } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private authService: AuthService) {}

  private isApptmPending(apptm: Appointment) {
    return apptm.status === AppointmentStatus.SCHEDULED;
  }

  canEnterEditPage(apptm: Appointment): boolean {
    if (!this.authService.getUser()) return false;
    return this.isApptmPending(apptm);
  }

  canDelete(apptm: Appointment): boolean {
    if (!this.authService.getUser()) return false;
    if (!this.authService.isAdmin()) return false;
    return this.isApptmPending(apptm);
  }

  canEditApptmInfo(apptm: Appointment): boolean {
    if (!this.authService.getUser()) return false;
    if (this.authService.isAdmin()) return false;
    return this.isApptmPending(apptm);
  }

  canAlterApptmStatus(apptm: Appointment) {
    if (!this.authService.getUser()) return false;
    return this.isApptmPending(apptm);
  }
}
