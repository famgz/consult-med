import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { AppointmentsComponent } from './modules/appointments/appointments.component';
import { ListComponent } from './modules/appointments/components/list/list.component';
import { CreateComponent } from './modules/appointments/components/create/create.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './commons/components/not-found/not-found.component';
import { editGuard } from './core/guards/edit.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'edit/:id',
        component: CreateComponent,
        canActivate: [editGuard],
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
