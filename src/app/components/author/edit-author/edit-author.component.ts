import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

import { Author, AuthorRequest } from '../../../bookshop';

import { BookshopService } from '../../../bookshop.service';

import { AuthorData } from '../author.component';

@Component({
  selector: 'app-edit-author',
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
  templateUrl: './edit-author.component.html',
  styleUrl: './edit-author.component.scss'
})
export class EditAuthorComponent {
  
  authorForm = new FormGroup({
    id: new FormControl('', Validators.required),
    firstName: new FormControl<string>('', [ 
      Validators.required,
      Validators.minLength(5)]),
    lastName: new FormControl<string>('', [ 
      Validators.required,
      Validators.minLength(5)]),
    biography: new FormControl<string>('',[])    
  });

  constructor(
    private bookshopService: BookshopService,
    public dialogRef: MatDialogRef<EditAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AuthorData,
    private toastr: ToastrService) {
      this.authorForm.get('id')?.setValue(this.data.id + '');
      this.authorForm.get('firstName')?.setValue(this.data.firstName);
      this.authorForm.get('lastName')?.setValue(this.data.lastName);
      this.authorForm.get('biography')?.setValue(this.data.biography);
  }
 
  getErrorMessage(control: string) {
    if(this.authorForm.get(control)?.hasError('required')) {
      return 'The field is required';
    }

    if(this.authorForm.get(control)?.hasError('minlength')) {
      return 'Must be more than 4 characters';
    }

    return '';
  }

  save() {
    if(this.authorForm.valid) {
      this.bookshopService.updateAuthor(parseInt(this.authorForm.value.id!), <AuthorRequest> {
        firstName: this.authorForm.value!.firstName!,
        lastName: this.authorForm.value!.lastName!,
        biography: this.authorForm.value.biography
      }).subscribe({
        next: (data) => {
          this.toastr.warning('Author edited!!','Editing author');
          this.dialogRef.close(data);
        },
        error: (err) => { 
          this.toastr.error('Author cant\'t be edited ' + err.error.message, 'Error editing author');
        }
      });
    } else {
      this.toastr.error('The form is invalid', 'Error editing author');
    }
  }
  close() {
    this.dialogRef.close();
  } 

}