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
import { Constants } from '../../../../commons/constants/contants.enum';
import { AuthUser, UserCredentials } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { HeroImageComponent } from '../../../../commons/components/hero-image/hero-image.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../../../../commons/components/message-modal/message-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    HeroImageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  openDialog(title: string, message: string): void {
    this.dialog.open(MessageModalComponent, {
      disableClose: false,
      data: {
        title,
        message,
      },
    });
  }

  login(): void {
    const user: UserCredentials = this.form.getRawValue();
    this.authService
      .login(user)
      .pipe(first())
      .subscribe({
        next: (res: AuthUser) => {
          localStorage.setItem(Constants.TOKEN_KEY, res.token);
          localStorage.setItem(Constants.USER_INFO, JSON.stringify(res.user));
        },
        error: (err) => {
          console.error(err);
          this.openDialog(err.error.message, '');
        },
        complete: () => {
          this.authService.isLoggedIn();
          this.router.navigate(['appointments']);
        },
      });
  }
}
