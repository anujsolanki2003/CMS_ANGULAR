import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  formData: any = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    role: '',
  };

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.formData = { ...data };
    }
  }

  submit(): void {
    console.log('Submitting data:', this.formData);
    this.dialogRef.close(this.formData);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
