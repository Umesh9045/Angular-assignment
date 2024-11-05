import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  constructor(public dialogRef: MatDialogRef<DeleteProductComponent>) { }
  // dialogRef: any;
  onConfirm(): void {
    this.dialogRef.close(true); // Close the dialog and return true
  }
}
