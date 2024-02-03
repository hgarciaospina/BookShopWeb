import { Component, Inject } from '@angular/core';
import { BookshopService } from '../../../bookshop.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-view-author',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './view-author.component.html',
  styleUrl: './view-author.component.scss'
})
export class ViewAuthorComponent {
  id: number = 0;
  firstName: string = '';
  lastName:  string = '';
  biography: string = '';

  constructor(
    private bookshopService: BookshopService,
    public dialogRef: MatDialogRef<ViewAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) {
      
      this.bookshopService.getAuthorById(data.id)
        .subscribe((author) => {
          this.id = author.id;
          this.firstName = author.firstName;
          this.lastName = author.lastName;
          this.biography = author.biography;
        });
  }

closeDialog() {
  this.dialogRef.close();
  }
}

export interface DialogData {
  id: number;
}