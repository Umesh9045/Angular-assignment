import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(public dialogRef: MatDialogRef<LogoutComponent>,  private _snackBar: MatSnackBar) { }
  // dialogRef: any;
  onConfirm(): void {
    this.dialogRef.close(true); // Close the dialog and return true
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Logout successful', 'Okay', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
