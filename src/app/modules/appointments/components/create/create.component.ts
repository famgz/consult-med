import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import moment from 'moment';
import { first } from 'rxjs';
import { HeroImageComponent } from '../../../../commons/components/hero-image/hero-image.component';
import { DateParserService } from '../../../../commons/services/date-parser.service';
import { AuthService } from '../../../auth/services/auth.service';
import {
  Appointment,
  AppointmentStatus,
  appointmentStatusDict,
  specialtyDict,
} from '../../models/appointment.model';
import { PermissionsService } from '../../services/permissions.service';
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
    MatRadioModule,
    HeroImageComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  infoForm!: FormGroup;
  statusForm!: FormGroup;

  id = '';

  nextDay = moment().add(2, 'days');
  nextDayString = this.nextDay.format('YYYY-MM-DD');

  appointment: Appointment | null = null;

  apptmStatus = AppointmentStatus;

  apptmStatusList = Object.values(AppointmentStatus);

  statusDict = appointmentStatusDict;

  specialtyDict = specialtyDict;

  specialtyList = Object.keys(specialtyDict);

  currentDoctors: string[] = [];

  constructor(
    private productsService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute,
    public dateParser: DateParserService,
    public permissions: PermissionsService,
    public authService: AuthService
  ) {
    this.buildInfoForm();
    this.buildStatusForm();
    this.subscribeToSpecialtyChanges();
  }

  ngOnInit(): void {
    // to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.id = this.route.snapshot.params['id']; // this.route.snapshot.paramMap.get('id')
      // edit mode -> patch the form
      if (this.id) {
        this.getAppointmentById();
      }
    }, 0);
  }

  buildInfoForm(): void {
    this.infoForm = new FormGroup({
      specialty: new FormControl(null, [Validators.required]),
      doctor: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [
        Validators.required,
        Validators.min(this.nextDay.millisecond()),
      ]),
      time: new FormControl(null, [Validators.required]),
      obs: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
    });
  }

  subscribeToSpecialtyChanges(): void {
    this.infoForm
      .get('specialty')
      ?.valueChanges.subscribe((specialty: string) => {
        this.currentDoctors = this.specialtyDict[specialty] || [];
      });
  }

  buildStatusForm(): void {
    this.statusForm = new FormGroup({
      status: new FormControl(null, [
        Validators.required,
        this.statusChangedValidator(),
      ]),
    });
  }

  statusChangedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === this.apptmStatus.SCHEDULED) {
        return { statusNotChanged: false };
      }
      return null;
    };
  }

  getAppointmentById(): void {
    this.productsService
      .getAppointmentById(this.id)
      .pipe(first())
      .subscribe({
        next: (appointment) => {
          this.appointment = appointment;
          this.infoForm.patchValue(appointment);
        },
      });
  }

  onSubmitInfo(): void {
    const appointment: Appointment = this.infoForm.getRawValue();
    this.id
      ? this.updateAppointment(appointment)
      : this.createAppointment(appointment);
  }

  onSubmitStatus(): void {
    if (!this.id) {
      console.log('No id was found');
      return;
    }

    const status: AppointmentStatus = this.statusForm.getRawValue().status;
    if (!status || !this.apptmStatusList.includes(status)) {
      console.log(`Invalid status: ${status}`);
      return;
    }

    let func;

    switch (status) {
      case AppointmentStatus.DONE:
        func = this.productsService.doneAppointment(this.id);
        break;
      case AppointmentStatus.CANCELED:
        func = this.productsService.cancelAppointment(this.id);
        break;
      default:
        console.log(`Invalid status: ${status}`);
        return;
    }

    func.pipe(first()).subscribe({
      next: (res) => console.log({ res }),
      complete: () => {
        this.router.navigate(['appointments']);
      },
    });
  }

  createAppointment(appointment: Appointment): void {
    this.productsService
      .saveAppointment(appointment)
      .pipe(first())
      .subscribe({
        next: (res) => console.log({ res }),
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
        next: (res) => console.log({ res }),
        complete: () => {
          this.router.navigate(['appointments']);
        },
      });
  }
}
