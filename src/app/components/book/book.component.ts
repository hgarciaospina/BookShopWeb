import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';

import { BookshopService } from '../../bookshop.service';

import { Author, Category } from '../../bookshop';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})

export class BookComponent {
  displayedColumns: string[] = ['id', 'title', 'author', 'price', 'image', 'options'];
  dataSource: BookData[] = [];
  
  constructor(private bookshopService: BookshopService) {
    this.bookshopService.getAllBooks()
     .subscribe(
      (books) => {
         this.dataSource = books.map(boo => <BookData> {
          id: boo.id,
          title: boo.title,
          author: `${boo.author.firstName}` + ' ' + `${boo.author.lastName}`, 
          price: boo.price,
          image: boo.image
         });
        }
     );
  } 


}

export interface BookData {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  
}