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

export interface SpecialtyList {
  [specialty: string]: string[];
}

export const specialtyDict: SpecialtyList = {
  Cardiologia: [
    'Mariana Silva',
    'Carlos Mendes',
    'Ana Garcia',
    'Javier Rodrigues',
    'Laura Pereira',
  ],
  Dermatologia: [
    'Ricardo Gomes',
    'Sofia Fernandes',
    'Marta Lopes',
    'Pedro Martins',
    'Isabela Torres',
  ],
  Endocrinologia: [
    'João Fernandes',
    'Elena Santos',
    'Miguel Gonçalves',
    'Carmem Ribeiro',
    'Luísa Dias',
  ],
  Gastroenterologia: [
    'Antônio Pereira',
    'Lucia Martins',
    'Manuel Ramos',
    'Patrícia Alves',
    'Jorge Garcia',
  ],
  'Ginecologia e Obstetrícia': [
    'Ana Maria Pereira',
    'Javier Martins',
    'Laura Santos',
    'Diego Rodrigues',
    'Carmem Ribeiro',
  ],
  Hematologia: [
    'Paulo Fernandes',
    'Sofia Martins',
    'Carlos Garcia',
    'Mariana Lopes',
    'José Pereira',
  ],
  Infectologia: [
    'Laura Fernandes',
    'Marcos Rodrigues',
    'Lucia Gomes',
    'Antônio Ribeiro',
    'Maria Martins',
  ],
  Nefrologia: [
    'Luís Ferreira',
    'Isabela Garcia',
    'Miguel Lopes',
    'Laura Pereira',
    'Javier Santos',
  ],
  Neurologia: [
    'José Martins',
    'Sofia Rodrigues',
    'Luís Garcia',
    'Ana Lopes',
    'Carlos Pereira',
  ],
  Oncologia: [
    'Miguel Fernandes',
    'Lucia Gomes',
    'Javier Martins',
    'Maria Santos',
    'Carlos Lopes',
  ],
  'Ortopedia e Traumatologia': [
    'Paulo Ramos',
    'Ana Garcia',
    'Javier Pereira',
    'Laura Hernandez',
    'Miguel Ribeiro',
  ],
  Otorrinolaringologia: [
    'Carlos Santos',
    'Lucia Martins',
    'Pedro Gomes',
    'Maria Rodrigues',
    'Javier Fernandes',
  ],
  Pediatria: [
    'Sofia Lopes',
    'Luís Gomes',
    'Ana Martins',
    'Miguel Fernandes',
    'Laura Ribeiro',
  ],
  Pneumologia: [
    'Antônio Garcia',
    'Mariana Hernandez',
    'Jorge Pereira',
    'Lucia Santos',
    'Carlos Rodrigues',
  ],
  Psiquiatria: [
    'João Martins',
    'Elena Gomes',
    'Miguel Fernandes',
    'Lucia Rodrigues',
    'Javier Lopes',
  ],
  Radiologia: [
    'Pedro Rodrigues',
    'Ana Garcia',
    'Luís Martins',
    'Mariana Pereira',
    'Javier Fernandes',
  ],
  Reumatologia: [
    'Lucia Martins',
    'Miguel Fernandes',
    'Ana Rodrigues',
    'Carlos Pereira',
    'Mariana Gomes',
  ],
  Urologia: [
    'Javier Santos',
    'Mariana Garcia',
    'Luís Pereira',
    'Lucia Martins',
    'Miguel Ferreira',
  ],
  'Cirurgia Geral': [
    'Carlos Rodrigues',
    'Ana Pereira',
    'Jorge Martins',
    'Mariana Ribeiro',
    'Miguel Fernandes',
  ],
  Oftalmologia: [
    'Javier Gomes',
    'Lucia Fernandes',
    'Pedro Martins',
    'Ana Santos',
    'Carlos Lopes',
  ],
};
