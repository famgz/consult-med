import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { first } from 'rxjs';
import { Appointment } from '../../models/appointment.model';
import { AppointmentsService } from './../../services/appointments.service';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  id = '';

  constructor(
    private productsService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.id = this.route.snapshot.params['id']; // this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.getAppointmentById();
    }
  }

  buildForm(): void {
    this.form = new FormGroup({
      specialty: new FormControl(null, [Validators.required]),
      doctor: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl('00:00', [
        Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
      ]),
      obs: new FormControl(null, [Validators.required]),
    });
  }

  getAppointmentById(): void {
    this.productsService
      .getAppointmentById(this.id)
      .pipe(first())
      .subscribe({
        next: (appointment) => {
          console.log({ appointment });
          this.form.patchValue(appointment);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  onSave(): void {
    const appointment: Appointment = this.form.getRawValue();
    this.id
      ? this.updateAppointment(appointment)
      : this.createAppointment(appointment);
  }

  createAppointment(appointment: Appointment): void {
    this.productsService
      .saveAppointment(appointment)
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.router.navigate(['appointments']);
        },
      });
  }

  updateAppointment(appointment: Appointment): void {
    this.productsService
      .updateAppointment(this.id, appointment)
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.router.navigate(['appointments']);
        },
      });
  }
}
