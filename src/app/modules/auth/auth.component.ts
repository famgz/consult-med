import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(private authService: AuthService) {}
}
