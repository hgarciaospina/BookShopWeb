import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
            CommonModule, 
            MatCardModule, 
            MatDividerModule, 
            MatButtonModule
          ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {

  }

  onConfirmation(confirmation: string) { 
    this.dialogRef.close(confirmation)
  }
}

export interface ConfirmDialogData {
  title: string;
  message: string;
}
