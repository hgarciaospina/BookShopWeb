import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';

import { BookshopService } from '../../bookshop.service';
import { ViewBookComponent } from './view-book/view-book.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Book, Category } from '../../bookshop';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  displayedColumns: string[] = ['id', 'title', 'author', 'price', 'image', 'options'];
  dataSource: BookData[] = [];
  
  constructor(private bookshopService: BookshopService,
    private dialog: MatDialog,
    private toastr: ToastrService) {
    this.loadDataSource();
  }

  private loadDataSource(){
    this.bookshopService.getAllBooks()
     .subscribe({
       next: (books) => {
         this.dataSource = books.map(boo => <BookData> {
          id: boo.id,
          title: boo.title,
          author: `${boo.author.firstName}` + ' ' + `${boo.author.lastName}`, 
          price: boo.price,
          image: boo.image
         });
         this.toastr.success('Information loaded', 'Loading books');
      },
       error: (err) => {
         this.toastr.error(err.error.message, 'Error Loading books' );
     }
    })
  }
  
  getBookById(id: number): void {
    this.bookshopService.getBookById(id).subscribe(
      (book: Book) => {
        book.id,
        book.title,
        book.description,
        book.price,
        book.isbn,
        book.pages,
        book.releaseDate
        book.image
        book.category.name,
        book.author.firstName,
        book.author.lastName
      },
      (error) => {
        this.toastr.error('The book could not be found. ' + error.error.message, 
                          'Error reading book by id');
      });
  }

  viewElement(id: number){
    const ref = this.dialog.open(ViewBookComponent, {
    data: { id }
    })
 };

 deleteElement(id: number) {
  const ref = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Delete Book',
      message: 'Are you sure to delete this book?'
    }
  });
  ref.afterClosed()
    .subscribe((data) => {
      if(data === 'Yes'){
        this.bookshopService.deleteBook(id)
        .subscribe({
          next: (data) => {
            this.loadDataSource();
            this.toastr.warning('Book deleted!!', 'Deleting book');
          },
          error: (err) => {
            this.toastr.error('Book cant\'t be deleted ' + err.error.message, 'Error deleting book');
          }
        });
      }
    });
 }


}

export interface BookData {
    id: number;
    title: string;
    author: string;
    price: number;
    image: string;   
}