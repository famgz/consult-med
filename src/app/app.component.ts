import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppointmentsComponent } from './modules/appointments/appointments.component';
import { HeaderComponent } from './commons/components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './commons/services/loading.service';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    AppointmentsComponent,
    HeaderComponent,
    MatProgressSpinnerModule,
    NgIf,
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
