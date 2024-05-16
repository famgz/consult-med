import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Subject, first } from 'rxjs';
import { ConfirmationModalComponent } from '../../../../commons/components/confirmation-modal/confirmation-modal.component';
import { DateParserService } from '../../../../commons/services/date-parser.service';
import { Appointment } from '../../models/appointment.model';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject();

  appointments: Appointment[] = [];

  constructor(
    private productsService: AppointmentsService,
    public dialog: MatDialog,
    private router: Router,
    public dateParser: DateParserService
  ) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.productsService
      .getAppointments()
      .pipe(first())
      .subscribe({
        next: (response: Appointment[]) => {
          this.appointments = response;
        },
        error: (err) => console.error(err),
      });
  }

  onDelete(id: string): void {
    this.productsService
      .deleteAppointment(id)
      .pipe(first())
      .subscribe({
        error: (err) => console.error(err),
        complete: () => this.getAppointments(),
      });
  }

  openDialog(id: string): void {
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
