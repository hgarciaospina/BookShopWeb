import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BookshopService } from '../../bookshop.service';
import { ViewBookComponent } from './view-book/view-book.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookRequest, Book, Author, Category } from '../../bookshop';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'image',
    'options',
  ];
  dataSource: BookData[] = [];
  constructor(
    private bookshopService: BookshopService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.loadDataSource();
  }

  private loadDataSource() {
    this.bookshopService.getAllBooks().subscribe({
      next: (books) => {
        this.dataSource = books.map(
          (boo) => <BookData>({
              id: boo.id,
              title: boo.title,
              description: boo.description,
              price: boo.price,
              isbn: boo.isbn,
              pages: boo.pages,
              releaseDate: boo.releaseDate,
              image: boo.image,
              author: boo.author,
              category: boo.category
            })
        );
        this.toastr.success('Information loaded', 'Loading books');
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error Loading books');
      },
    });
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
          book.releaseDate;
        book.image;
        book.category.name, book.author.firstName, book.author.lastName;
      },
      (error) => {
        this.toastr.error(
          'The book could not be found. ' + error.error.message,
          'Error reading book by id'
        );
      }
    );
  }

  viewElement(id: number) {
    console.log(id + 'Ingresó...');
    const ref = this.dialog.open(ViewBookComponent, {
      data: { id },
    });
  }

  newBook() {
    const ref = this.dialog.open(NewBookComponent);
    ref.afterClosed().subscribe((data) => {
      if (data) {
        this.dataSource = [data, ...this.dataSource];
      }
    });
  }

  editElement(bookRequest: BookRequest) {
    console.log(bookRequest);
    const ref = this.dialog.open(EditBookComponent, {
      data: bookRequest,
    });
    ref.afterClosed().subscribe((data) => {
      if (data) {
        const index = this.dataSource.findIndex((e) => e.id == data.id);
        this.dataSource[index].title = data.title;
        this.dataSource[index].description = data.description;
        this.dataSource[index].price = data.price;
        this.dataSource[index].isbn = data.isbn;
        this.dataSource[index].pages = data.pages;
        this.dataSource[index].releaseDate = data.releaseDate;
        this.dataSource[index].image = data.image;
        this.dataSource[index].category.id = data.category.id;
        this.dataSource[index].author.id = data.author.id;
      }
    });
  }

  deleteElement(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Book',
        message: 'Are you sure to delete this book?',
      },
    });
    ref.afterClosed().subscribe((data) => {
      if (data === 'Yes') {
        this.bookshopService.deleteBook(id).subscribe({
          next: (data) => {
            this.loadDataSource();
            this.toastr.warning('Book deleted!!', 'Deleting book');
          },
          error: (err) => {
            this.toastr.error(
              "Book cant't be deleted " + err.error.message,
              'Error deleting book'
            );
          },
        });
      }
    });
  }
}

export interface BookData {
  id: number;
  title: string;
  description: string;
  price: number;
  isbn: string;
  pages: number;
  releaseDate: Date;
  image: string;
  category: Category;
  author: Author;
}