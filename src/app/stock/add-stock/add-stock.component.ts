import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss'],
})
export class AddStockComponent {
  stockForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddStockComponent>,
    private fb: FormBuilder
  ) {
    this.stockForm = this.fb.group({
      size: ['', Validators.required],
      color: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      totalQuantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.stockForm.valid) {
      this.dialogRef.close(this.stockForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
