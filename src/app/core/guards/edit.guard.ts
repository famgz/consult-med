import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { first, firstValueFrom } from 'rxjs';
import { Appointment } from '../../modules/appointments/models/appointment.model';
import { AppointmentsService } from '../../modules/appointments/services/appointments.service';
import { PermissionsService } from '../../modules/appointments/services/permissions.service';

export const editGuard: CanActivateFn = async (activatedRoute, state) => {
  const { id } = activatedRoute.params;

  if (!id) {
    console.log('No appointment id was given to edit');
    return false;
  }

  const appointmentService = inject(AppointmentsService);
  const permissionsService = inject(PermissionsService);

  try {
    const apptm: Appointment | null = await firstValueFrom(
      appointmentService.getAppointmentById(id)
    );

    if (!apptm) {
      console.log('Invalid appointment:');
      console.log({ apptm });
      return false;
    }

    return permissionsService.canEnterEditPage(apptm);
  } catch (error) {
    console.error(error);
    return false;
  }
};
