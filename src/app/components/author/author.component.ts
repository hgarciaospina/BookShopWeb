import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';
import { BookshopService } from '../../bookshop.service';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})

export class AuthorComponent {
  displayedColumns: string[] = ['id', 'author', 'options'];
  dataSource: AuthorData[] = [];

  constructor(private bookshopService: BookshopService) {
    this.bookshopService.getAllAuthors()
     .subscribe(
      (authors) => {
         this.dataSource = authors.map(aut => <AuthorData> {
          id: aut.id,
          author: `${aut.firstName}` + ' ' + `${aut.lastName}`  
         });
        }
     );
  }


}

export interface AuthorData {
  id: number;
  author: string;
}