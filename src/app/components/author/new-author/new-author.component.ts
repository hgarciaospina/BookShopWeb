import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { BookshopService } from '../../../bookshop.service';
import { Author, AuthorRequest } from '../../../bookshop';

@Component({
  selector: 'app-new-author',
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
  templateUrl: './new-author.component.html',
  styleUrl: './new-author.component.scss'
})
export class NewAuthorComponent {

  authorForm = new FormGroup({
    firstName: new FormControl('', [ 
      Validators.required,
      Validators.minLength(5)]),
    lastName: new FormControl('', [ 
      Validators.required,
      Validators.minLength(5)]),
    biography: new FormControl('',[])    
  });

  constructor(
    private bookshopService: BookshopService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<NewAuthorComponent>) {
    
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
      this.bookshopService.createAuthor(<AuthorRequest>{
        firstName: this.authorForm.value!.firstName!,
        lastName: this.authorForm.value!.lastName!,
        biography: this.authorForm.value.biography
      }).subscribe({
        next: (data) => {
          this.toastr.success('Author created!!','Creating author');
          this.dialogRef.close(data);
        },
        error: (err) => { 
          this.toastr.error('Author cant\'t be created ' + err.error.message, 
                            'Error creating author');
        }
      });
    }
  }
  
  close() {
    this.dialogRef.close();
  }

}