import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';

import { BookshopService } from '../../../bookshop.service';

import { CategoryData } from '../category.component';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../bookshop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.scss'
})
export class NewCategoryComponent {

  categoryForm = new FormGroup({
    name: new FormControl<string>('', [ 
      Validators.required,
      Validators.minLength(5)]),
  });
  
  constructor(
    private bookshopService: BookshopService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<NewCategoryComponent>) {
    
  }
 
  getErrorMessage(control: string) {
    if(this.categoryForm.get(control)?.hasError('required')) {
      return 'The field is required';
    }

    if(this.categoryForm.get(control)?.hasError('minlength')) {
      return 'Must be more than 4 characters';
    }

    return '';
  }

  save() {
    if(this.categoryForm.valid) {
      this.bookshopService.createCategory(<Category>{
        name: this.categoryForm.value!.name
      }).subscribe({
        next: (data) => {
          this.toastr.success('Category created!!','Creating category');
          this.dialogRef.close(data);
        },
        error: (err) => { 
          this.toastr.error('Error creating category', 'Category cant\'t be created ' + err.error.message);
        }
      });
    }
  }
  
  close() {
    this.dialogRef.close();
  }
}