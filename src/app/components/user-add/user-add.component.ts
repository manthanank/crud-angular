import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',
})
export class UserAddComponent {
  protected userForm!: FormGroup;
  submitted = false;

  private userService = inject(UsersService);
  private snackbarService = inject(SnackbarService);
  router = inject(Router);

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
    });
  }

  get name() {
    return this.userForm.get('name');
  }

  get age() {
    return this.userForm.get('age');
  }

  save() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userService.addUser(this.userForm.getRawValue()).subscribe(
      {
        next: () => {
          this.snackbarService.showSnackBar('User added successfully');
          this.navigateToHome();
        },
        error: () => {
          this.snackbarService.showSnackBar('Error adding user');
        },
      }
    );
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
