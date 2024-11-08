import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core'; // Ensure this is imported
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule, // Add this to the imports array
    ReactiveFormsModule,
    MatTooltipModule,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  readonly startDate = new Date(2024, 7, 1);  // 1st August 2024
  form: FormGroup = new FormGroup({});
  submitted = false;
  readonly minDate = new Date(2024, 7, 1);
  readonly maxDate = new Date();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, public dialogRef: MatDialogRef<AddProductComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      purchaseDate: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // console.log('Form Submitted:', JSON.stringify(this.form.value, null, 2));
    const newProduct = this.form.value;
    // this.http.post('http://localhost:4200/products', newProduct).subscribe({
    //   next: () => {
    //     console.log('Product added successfully' + newProduct);
    //     alert('Product added sucessfully');
    //     this.dialogRef.close(newProduct); // Pass data back to the parent component
    //   },
    //   error: (error) => console.error('Error adding product:', error)
    // });
    // alert('Product added successfully');

    this.dialogRef.close(newProduct);
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Product added successfully!', 'Okay', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}