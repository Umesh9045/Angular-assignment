import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { Product } from '../../../models/product';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
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
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  readonly startDate = new Date(2024, 7, 1);  // 1st August 2024
  form: FormGroup = new FormGroup({});
  submitted = false;
  readonly minDate = new Date(2024, 7, 1);
  readonly maxDate = new Date();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, public dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public data: Product, private _snackBar: MatSnackBar) { }

  // Validator function to enforce date range between 1st August 2024 and today
  dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const minDate = new Date(2024, 7, 1);
      const maxDate = new Date(); // Today's date

      if (selectedDate < minDate || selectedDate > maxDate) {
        return { dateOutOfRange: true };
      }
      return null;
    };
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.data.name, [Validators.required]],  // Set default value from data
      price: [this.data.price, [Validators.required]],
      purchaseDate: [this.data.purchaseDate, [Validators.required, this.dateRangeValidator()]],
      quantity: [this.data.quantity, [Validators.required]]
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

    const updatedProduct = this.form.value;
    // alert('Product edited successfully');
    this.dialogRef.close(updatedProduct);
    this.openSnackBar()
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset({
      name: this.data.name,
      price: this.data.price,
      purchaseDate: this.data.purchaseDate,
      quantity: this.data.quantity
    });
  }  

  openSnackBar() {
    this._snackBar.open('Product edited successfully!', 'Okay', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
