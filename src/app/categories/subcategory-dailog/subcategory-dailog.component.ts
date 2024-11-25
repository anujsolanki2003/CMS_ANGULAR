import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-subcategory-dialog',
  templateUrl: './subcategory-dailog.component.html',
  styleUrls: ['./subcategory-dailog.component.scss'],
})
export class SubcategoryDialogComponent {
  subcategoryForm: FormGroup;
  categories: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<SubcategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) {
    this.categories = data.categories || [];
    this.subcategoryForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      categoryId: [data?.categoryId || '', Validators.required],
      addedBy: [
        localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user')!).name
          : '',
      ],
    });
  }

  onSubmit(): void {
    if (this.subcategoryForm.valid) {
      this.dialogRef.close(this.subcategoryForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
