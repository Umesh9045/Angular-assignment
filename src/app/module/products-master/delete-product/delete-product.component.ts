import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  constructor(public dialogRef: MatDialogRef<DeleteProductComponent>, private _snackBar: MatSnackBar) { }
  // dialogRef: any;
  onConfirm(): void {
    this.dialogRef.close(true); // Close the dialog and return true
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Product deleted successfully!', 'Okay', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
