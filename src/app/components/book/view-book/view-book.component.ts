import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { BookshopService } from '../../../bookshop.service';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.scss'
})
export class ViewBookComponent {
  id: number = 0;
  title: string = '';
  description: string = '';
  price: number = 0;
  isbn: string = '';
  pages: number = 0;
  releaseDate: Date = new Date();
  image: string = '';
  categoryName: string = '';
  authorFullName: string = '';

  constructor(
    private bookshopService: BookshopService,
    public dialogRef: MatDialogRef<ViewBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) {
      
      this.bookshopService.getBookById(data.id)
        .subscribe((book) => {
          this.id = book.id;
          this.title = book.title;
          this.description = book.description;
          this.price= book.price;
          this.isbn = book.isbn;
          this.pages = book.pages;
          this.releaseDate = book.releaseDate;
          this.image = book.image;
          this.categoryName = book.category.name;
          this.authorFullName = book.author.firstName + ' ' + book.author.lastName;
        });
  }

closeDialog() {
  this.dialogRef.close();
  }
}

export interface DialogData {
  id: number;
}
