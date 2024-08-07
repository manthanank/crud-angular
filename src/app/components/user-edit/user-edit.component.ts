import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-edit',
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
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent {
  protected userForm!: FormGroup;
  submitted = false;

  private userService = inject(UsersService);
  private snackbarService = inject(SnackbarService);
  private activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  
  constructor() {
    const userId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.userForm = new FormGroup({
      _id: new FormControl(userId),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
    });

    this.userService.getUserById(userId).subscribe(
      {
        next: (user) => {
          this.userForm.patchValue(user);
        },
        error: () => {
          this.snackbarService.showSnackBar('Error getting user');
          this.navigateToHome();
        }
      }
    );
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
    this.userService.updateUser(this.userForm.getRawValue()).subscribe(
      {
        next: () => {
          this.snackbarService.showSnackBar('User updated successfully');
          this.navigateToHome();
        },
        error: () => {
          this.snackbarService.showSnackBar('Error updating user');
        }
      }
    );
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
