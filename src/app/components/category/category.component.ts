import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { BookshopService } from '../../bookshop.service';

import { Category } from '../../bookshop';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { NewCategoryComponent } from './new-category/new-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
    displayedColumns: string[] = ['id', 'name', 'options'];
    dataSource: CategoryData[] = [];

  constructor(
    private bookshopService: BookshopService, 
    private dialog: MatDialog) {
    this.loadDataSource();
    }    

    private loadDataSource(){
      this.bookshopService.getAllCategories()
        .subscribe({
          next: (categories) => {
            this.dataSource = categories.map(cat => <CategoryData>{
              id: cat.id,
              name: cat.name
            });
         },
         error: (err) => {
           console.log(err);
         }
        })      
    }
    
  getCategoryById(id: number): void {
    this.bookshopService.getCategoryById(id).subscribe(
      (category: Category) => {
        category.id,
        category.name
      },
      (error) => {
        // Manejar el error si es necesario
        console.error(error);
      }
    );
  }

  viewElement(id: number){
    const ref = this.dialog.open(ViewCategoryComponent, {
    data: { id }
    });
  }
  
  newCategory(){
    const ref = this.dialog.open(NewCategoryComponent);
    ref.afterClosed()
    .subscribe((data) => {
      if(data) {
        this.loadDataSource(); 
      }
    });
  }


   editElement(category: CategoryData) {
    const ref = this.dialog.open(EditCategoryComponent, {
      data: category
    })
    ref.afterClosed()
    .subscribe((data) => {
      if(data) {
        const index = this.dataSource.findIndex(e => e.id == data.id);
        this.dataSource[index].name = data.name; 
      }
    });
   }

   deleteElement(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete category',
        message: 'Are you sure ti delete this category'
      }
    });

    ref.afterClosed()
      .subscribe((data) => {
        if(data === 'Yes'){
          this.bookshopService.deleteCategory(id)
          .subscribe({
            next: (data) => {
              this.loadDataSource();
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      });
   }
 
  }
 
export interface CategoryData {
  id: number;
  name: string;
}