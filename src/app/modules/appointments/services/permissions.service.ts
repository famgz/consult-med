import { Injectable } from '@angular/core';
import { UserRole } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Appointment, AppointmentStatus } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private authService: AuthService) {}

  canEdit(apptm: Appointment): boolean {
    if (!this.authService.user) {
      return false;
    }

    if (this.authService.user?.role === UserRole.ADMIN) {
      return true;
    }

    return apptm.status === AppointmentStatus.SCHEDULED;
  }

  canDelete(): boolean {
    return this.authService.user?.role === UserRole.ADMIN;
  }
}
