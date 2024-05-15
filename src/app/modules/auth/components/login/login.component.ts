import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthUser, UserCredentials } from '../../models/user.model';
import { first } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Constants } from '../../../../commons/constants/contants.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login(): void {
    const user: UserCredentials = this.form.getRawValue();
    this.authService
      .login(user)
      .pipe(first())
      .subscribe({
        next: (res: AuthUser) => {
          console.log(res);
          localStorage.setItem(Constants.TOKEN_KEY, res.token);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.router.navigate(['appointments']);
        },
      });
  }
}
