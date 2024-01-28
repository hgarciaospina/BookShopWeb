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
    private dialog: MatDialog
    
    ) {
    this.bookshopService.getAllCategories()
     .subscribe(
      (categories) => {
         this.dataSource = categories.map(cat => <CategoryData> {
          id: cat.id,
          name: cat.name
         });
        }
     );
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
    this.dialog.open(ViewCategoryComponent, {
    data: { id }
    });
   }
  }


export interface CategoryData {
  id: number;
  name: string;
}