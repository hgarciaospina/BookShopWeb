import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatCardModule} from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookshopService } from '../../bookshop.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewAuthorComponent } from './view-author/view-author.component';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})

export class AuthorComponent {

  viewElement(id: number){
    const ref = this.dialog.open(ViewAuthorComponent, {
    data: { id }
    });
  }

  displayedColumns: string[] = ['id', 'author', 'options'];
  dataSource: AuthorData[] = [];

  constructor(private bookshopService: BookshopService,
    private dialog: MatDialog,
    private toastr: ToastrService) {
    this.loadDataSource();
    }
    
    private loadDataSource(){
      this.bookshopService.getAllAuthors()
       .subscribe({
          next: (authors) => {
           this.dataSource = authors.map(aut => <AuthorData> {
            id: aut.id,
            author: `${aut.firstName}` + ' ' + `${aut.lastName}`  
         });
         this.toastr.success('Information loaded', 'Loading authors');
        },
         error: (err) => {
           this.toastr.error('Error Loading categories' , err.error.message);
      }
    })
  }
}

export interface AuthorData {
  id: number;
  author: string;
}