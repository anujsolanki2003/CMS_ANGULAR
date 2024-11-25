import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-stock-confirmation-dialog',
  templateUrl: './stock-confirmation-dialog.component.html',
  styleUrls: ['./stock-confirmation-dialog.component.scss'],
})
export class StockConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StockConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
