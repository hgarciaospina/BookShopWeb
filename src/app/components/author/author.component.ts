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
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { NewAuthorComponent } from './new-author/new-author.component';
import { Author } from '../../bookshop';

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
          firstName: aut.firstName,
          lastName: aut.lastName,  
          biography: aut.biography 
       });
       this.toastr.success('Information loaded', 'Loading authors');
      },
       error: (err) => {
         this.toastr.error(err.error.message, 'Error Loading authors' );
     }
   })
  }
  
  getAuthorById(id: number): void {
    this.bookshopService.getAuthorById(id).subscribe(
      (author: Author) => {
        author.id,
        author.firstName,
        author.lastName,
        author.biography
      },
      (error) => {
        this.toastr.error('The author could not be found. ' + error.error.message, 
                          'Error reading author by id');
      }
    );
  }

  viewElement(id: number){
    const ref = this.dialog.open(ViewAuthorComponent, {
    data: { id }
    });
  }

  newAuthor(){
    const ref = this.dialog.open(NewAuthorComponent);
    ref.afterClosed()
    .subscribe((data) => {
      if(data) {
        this.dataSource = [
          data,
          ...this.dataSource
        ]; 
      }
    });
  }

  editElement(author: AuthorData) {
    const ref = this.dialog.open(EditAuthorComponent, {
      data: author
    })
    ref.afterClosed()
    .subscribe((data) => {
      if(data) {
        const index = this.dataSource.findIndex(e => e.id == data.id);
        this.dataSource[index].firstName = data.firstName;
        this.dataSource[index].lastName = data.lastName;
        this.dataSource[index].biography = data.biography; 
      }
    });
  }

  deleteElement(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete author',
        message: 'Are you sure to delete this author?'
      }
    });
    ref.afterClosed()
      .subscribe((data) => {
        if(data === 'Yes'){
          this.bookshopService.deleteAuthor(id)
          .subscribe({
            next: (data) => {
              this.loadDataSource();
              this.toastr.warning('Deleting author','Author deleted!!')
            },
            error: (err) => {
              this.toastr.error('Author cant\'t be deleted ' + err.error.message, 'Error deleting author');
            }
          });
        }
      });
   }

}

export interface AuthorData {
  id: number;
  firstName: string;
  lastName: string;
  biography: string;
}