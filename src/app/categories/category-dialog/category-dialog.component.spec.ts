import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent {
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecting data for edit functionality
  ) {
    // Initialize form and handle data for edit functionality
    this.categoryForm = this.fb.group({
      name: [data?.name || '', Validators.required], // If data exists, use it for edit
      addedBy: [localStorage.getItem('name')],
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
