export interface Appointment {
  id?: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  obs: string;
  status: AppointmentStatus;
}

export interface AddAppointment {
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  obs: string;
}

export enum AppointmentStatus {
  SCHEDULED = 'Agendada',
  DONE = 'Concluída',
  CANCELED = 'Cancelada',
}
