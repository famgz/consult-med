import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss',
})
export class MessageModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
