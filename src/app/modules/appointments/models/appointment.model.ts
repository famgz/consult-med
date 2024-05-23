import { User } from '../../auth/models/user.model';

export interface Appointment {
  id?: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  obs: string;
  status: AppointmentStatus;
  User?: User;
}

export interface AddAppointment {
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  obs: string;
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

export const appointmentStatusDict = {
  SCHEDULED: { title: 'Agendada', color: '#ccc' },
  DONE: { title: 'Concluída', color: 'forestgreen' },
  CANCELED: { title: 'Cancelada', color: 'tomato' },
};
