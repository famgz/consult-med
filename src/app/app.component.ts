import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './commons/components/header/header.component';
import { LoadingService } from './commons/services/loading.service';
import { AppointmentsComponent } from './modules/appointments/appointments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    AppointmentsComponent,
    HeaderComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'consult-med';
  isLoading = false;

  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((res) => {
      this.isLoading = res;
    });
  }
}
