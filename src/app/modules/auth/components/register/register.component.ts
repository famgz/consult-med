import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { AddUser, UserRole } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { HeroImageComponent } from '../../../../commons/components/hero-image/hero-image.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../../../../commons/components/message-modal/message-modal.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HeroImageComponent,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  userRoles = Object.values(UserRole);

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      role: new FormControl('USER', [Validators.required]),
    });
  }

  openErrorDialog(title: string, message: string): void {
    this.dialog.open(MessageModalComponent, {
      disableClose: false,
      data: {
        title,
        message,
      },
    });
  }

  register(): void {
    const user: AddUser = this.form.getRawValue();
    this.authService
      .register(user)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
          this.openErrorDialog(err.error.message, '');
        },
        complete: () => {
          this.router.navigate(['auth', 'login']);
        },
      });
  }
}
