import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { BookshopService } from '../../../bookshop.service';

import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss'
})
export class ViewCategoryComponent {
  id: number = 0;
  name: string = '';

  constructor(
    private bookshopService: BookshopService,
    public dialogRef: MatDialogRef<ViewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) {
      
      this.bookshopService.getCategoryById(data.id)
        .subscribe((category) => {
          this.id = category.id;
          this.name = category.name
        });
  }

closeDialog() {
  this.dialogRef.close();
  }
}

export interface DialogData {
  id: number;
}