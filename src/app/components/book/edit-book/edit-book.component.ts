import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { BookRequest } from '../../../bookshop';
import { BookshopService } from '../../../bookshop.service';
import { AuthorData } from '../../author/author.component';
import { CategoryData } from '../../category/category.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BookData } from '../book.component';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss',
})
export class EditBookComponent {
  authorsSelect: AuthorData[] = [];
  categoriesSelect: CategoryData[] = [];

  bookForm = new FormGroup({
    id: new FormControl<number>(0, [Validators.required]),
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(150),
    ]),
    description: new FormControl<string>('', [Validators.maxLength(4000)]),
    price: new FormControl<number>(0.0, [
      Validators.required,
      Validators.min(10.0),
    ]),
    isbn: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
    ]),
    pages: new FormControl<number>(0, [
      Validators.required,
      Validators.min(50),
    ]),
    releaseDate: new FormControl<Date>(new Date(), [Validators.required]),
    image: new FormControl<string>('', []),
    categoryId: new FormControl<number>(0, [Validators.required]),
    authorId: new FormControl<number>(0, [Validators.required]),
  });

  constructor(
    private bookshopService: BookshopService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data: BookData) {
      this.bookForm.get('id')?.setValue(this.data.id);
      this.bookForm.patchValue({
        title: this.data.title,
        description: this.data.description, 
        price: this.data.price,
        isbn: this.data.isbn,
        pages: this.data.pages,
        releaseDate: this.data.releaseDate,
        image: this.data.image,
        authorId: this.data.author.id,
        categoryId: this.data.category.id,
      }); 
  }

  ngOnInit(): void {
    this.loadDataAuthorsSelect();
    this.loadDataCategoriesSelect();
  }

  getErrorMessage(control: string) {
    const formControl = this.bookForm.get(control);

    if (formControl?.hasError('required')) {
      return `The field ${control} is required`;
    }

    if (formControl?.hasError('minlength')) {
      return `The field ${control} must have at least  ${formControl.errors?.['minlength'].requiredLength} characters`;
    }

    if (formControl?.hasError('maxlength')) {
      return `The field ${control} cannot be more than ${formControl.errors?.['maxlength'].requiredLength} characters.`;
    }

    if (formControl?.hasError('min')) {
      return `The value must be greater than or equal ${formControl.errors?.['min'].min}.`;
    }

    return '';
  }

  loadDataAuthorsSelect() {
    this.bookshopService.getAllAuthors().subscribe({
      next: (authors) => {
        this.authorsSelect = authors.map(
          (aut) =>
            <AuthorData>{
              id: aut.id,
              firstName: aut.firstName,
              lastName: aut.lastName,
            }
        );
        this.toastr.success('Information loaded', 'Loading authors');
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error Loading authors');
      },
    });
  }

  loadDataCategoriesSelect() {
    this.bookshopService.getAllCategories().subscribe({
      next: (categories) => {
        this.categoriesSelect = categories.map(
          (cat) =>
            <CategoryData>{
              id: cat.id,
              name: cat.name,
            }
        );
        this.toastr.success('Information loaded', 'Loading categories');
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error Loading categories');
      },
    });
  }

  save() {
    if (this.bookForm.valid) {
      this.bookshopService.updateBook(this.bookForm.value.id!, <BookRequest>{
          id: this.bookForm.value!.id!,
          title: this.bookForm.value!.title!,
          description: this.bookForm.value.description,
          price: this.bookForm.value!.price!,
          isbn: this.bookForm.value!.isbn!,
          pages: this.bookForm.value!.pages!,
          releaseDate: this.bookForm.value!.releaseDate!,
          image: this.bookForm.value.image,
          categoryId: this.bookForm.value!.categoryId!,
          authorId: this.bookForm.value!.authorId!
        })
        .subscribe({
          next: (data) => {
            this.toastr.success('Book edited!!', 'Editing book');
            this.dialogRef.close(data);
          },
          error: (err) => {
            this.toastr.error(
              "Book cant't be edited " + err.error.message,
              'Error editing book'
            );
          },
        });
    }
  }

  close() {
    this.dialogRef.close();
  }
}