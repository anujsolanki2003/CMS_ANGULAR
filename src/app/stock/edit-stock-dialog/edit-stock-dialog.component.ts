import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-stock-dialog',
  templateUrl: './edit-stock-dialog.component.html',
  styleUrls: ['./edit-stock-dialog.component.scss'],
})
export class EditStockDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // Create a reactive form
    this.form = this.fb.group({
      size: [data.size, Validators.required],
      color: [data.color, Validators.required],
      price: [data.price, [Validators.required, Validators.min(0)]],
      totalQuantity: [
        data.totalQuantity,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
