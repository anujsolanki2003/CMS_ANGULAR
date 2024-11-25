import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../services/auth.service';
import { DeleteDialogComponent } from '../delete-dailog/delete-dailog.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`${this.apiUrl}/getUser`, { headers }).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.snackbarService.openSnackBar('Failed to load users.', 'Close');
      }
    );
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, { data: {} });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  addUser(user: any): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(this.apiUrl, user, { headers }).subscribe(
      () => {
        this.fetchUsers();
        this.snackbarService.openSnackBar('User added successfully!', 'Close');
      },
      (error) => {
        console.error('Error adding user:', error);
        this.snackbarService.openSnackBar(
          'Failed to add user. Please try again.',
          'Close'
        );
      }
    );
  }

  openEditModal(user: any): void {
    const dialogRef = this.dialog.open(UserDialogComponent, { data: user });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateUser(user.id, result);
      }
    });
  }

  updateUser(id: number, user: any): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Only send the password if it's not empty
    const payload = { ...user };
    if (!user.password) {
      delete payload.password;
    }

    this.http
      .put(`${this.apiUrl}/updateUser/${id}`, payload, { headers })
      .subscribe(
        () => {
          this.fetchUsers();
          this.snackbarService.openSnackBar(
            'User updated successfully!',
            'Close'
          );
        },
        (error) => {
          console.error('Error updating user:', error);
          this.snackbarService.openSnackBar(
            'Failed to update user. Please try again.',
            'Close'
          );
        }
      );
  }

  openDeleteDialog(index: number): void {
    const userName = this.users[index].name;
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { userName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(this.users[index].id!);
      }
    });
  }

  deleteUser(id: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`${this.apiUrl}/deleteUser/${id}`, { headers }).subscribe(
      () => {
        this.fetchUsers();
        this.snackbarService.openSnackBar(
          'User deleted successfully!',
          'Close'
        );
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.snackbarService.openSnackBar(
          'Failed to delete user. Please try again.',
          'Close'
        );
      }
    );
  }
}
