import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from '../../models/users';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './users-delete.component.html',
  styleUrl: './users-delete.component.scss',
})
export class UsersDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: User,
    private dialogRef: MatDialogRef<UsersDeleteComponent>
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
