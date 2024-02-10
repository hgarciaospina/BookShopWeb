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
import { CategoryRequest } from '../../../bookshop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
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
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {
  categoryForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl<string>('', [ 
      Validators.required,
      Validators.minLength(5)]),
  });
  
  constructor(
    private bookshopService: BookshopService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CategoryData) {
      this.categoryForm.get('id')?.setValue(this.data.id + '');
      this.categoryForm.get('name')?.setValue(this.data.name);
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
      this.bookshopService.updateCategory(parseInt(this.categoryForm.value.id!), <CategoryRequest>{
        id: parseInt(this.categoryForm.value!.id!),
        name: this.categoryForm.value!.name!
      }).subscribe({
        next: (data) => {
          this.toastr.warning('Category edited!!','Editing category');
          this.dialogRef.close(data);
        },
        error: (err) => { 
          this.toastr.error('Category cant\'t be edited ' + err.error.message, 'Error editing category');
        }
      });
    } else {
      this.toastr.error('The form is invalid', 'Error editing category');
    }
  }
  close() {
    this.dialogRef.close();
  }
}