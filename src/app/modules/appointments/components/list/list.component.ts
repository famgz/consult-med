import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Subject, first } from 'rxjs';
import { ConfirmationModalComponent } from '../../../../commons/components/confirmation-modal/confirmation-modal.component';
import { DateParserService } from '../../../../commons/services/date-parser.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AppointmentsService } from '../../services/appointments.service';
import { PermissionsService } from '../../services/permissions.service';
import {
  Appointment,
  AppointmentStatus,
  appointmentStatusDict,
} from './../../models/appointment.model';
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject();

  statusList = ['ALL', ...Object.values(AppointmentStatus)] as const;

  statusDict = {
    ...appointmentStatusDict,
    ALL: { title: 'Todas', color: '#ccc' },
  };

  appointments: Appointment[] = [];

  filteredAppointments: Appointment[] = [];

  currentStatusFilter = 'ALL';

  isAdmin: boolean = this.authService.isAdmin();

  user: User = this.authService.getUser()!;

  constructor(
    private productsService: AppointmentsService,
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    public dateParser: DateParserService,
    public permissions: PermissionsService
  ) {}

  ngOnInit(): void {
    // to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.getAppointments();
    }, 0);
  }

  getAppointments(): void {
    this.productsService
      .getAppointments()
      .pipe(first())
      .subscribe({
        next: (res: Appointment[]) => {
          console.log(res);
          this.appointments = res;
          this.sortAppointmentsByDatetime();
          this.filteredAppointments = this.appointments;
        },
        error: (err) => console.error(err),
      });
  }

  sortAppointmentsByDatetime(): void {
    this.appointments = this.appointments.sort((a, b) => {
      const dateTimeA = this.dateParser.getAppointmentFullDate(a);
      const dateTimeB = this.dateParser.getAppointmentFullDate(b);
      return dateTimeB.getTime() - dateTimeA.getTime();
    });
  }

  filterAppointmentsByStatus(status: string) {
    this.currentStatusFilter = status;
    if (status === 'ALL') {
      this.filteredAppointments = this.appointments;
      return;
    }
    this.filteredAppointments = this.appointments.filter(
      (apptm) => apptm.status === status
    );
  }

  onDelete(id: string): void {
    this.productsService
      .deleteAppointment(id)
      .pipe(first())
      .subscribe({
        complete: () => this.getAppointments(),
      });
  }

  openDeleteConfirmationDialog(id: string): void {
    this.dialog
      .open(ConfirmationModalComponent, {
        width: '250px',
        disableClose: true,
        data: {
          id,
        },
      })
      .afterClosed()
      .pipe(first())
      .subscribe((res) => {
        if (res) {
          this.onDelete(id);
        }
      });
  }

  editAppointment(id: string): void {
    this.router.navigate(['appointments', 'edit', id]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
