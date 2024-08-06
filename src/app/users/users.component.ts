import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'age', 'actions'];
  dataSource: any;

  editMode = false;
  isLoading = false;
  error: string | null = null;

  userForm: FormGroup = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    age: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.error = null;
    this.dataService.getUsers().subscribe(
      users => {
        this.dataSource = users;
        this.isLoading = false;
      },
      err => {
        this.error = 'Failed to load users';
        this.isLoading = false;
      }
    );
  }

  onEdit(user: any) {
    this.editMode = true;
    this.userForm.patchValue(user);
  }

  onCancel() {
    this.editMode = false;
    this.userForm.reset();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.error = null;
      if (this.editMode) {
        this.dataService.updateUser(this.userForm.value).subscribe(
          data => {
            this.getUser();
            this.editMode = false;
            this.isLoading = false;
          },
          err => {
            this.error = 'Failed to update user';
            this.isLoading = false;
          }
        );
      } else {
        this.dataService.addUser(this.userForm.value).subscribe(
          data => {
            this.getUser();
            this.isLoading = false;
          },
          err => {
            this.error = 'Failed to add user';
            this.isLoading = false;
          }
        );
      }
    }
    this.userForm.reset();
  }

  onDelete(id: any) {
    if (confirm("Are you sure?")) {
      this.isLoading = true;
      this.error = null;
      this.dataService.deleteUser(id).subscribe(
        data => {
          this.getUser();
          this.isLoading = false;
        },
        err => {
          this.error = 'Failed to delete user';
          this.isLoading = false;
        }
      );
    }
  }

  onReset() {
    this.userForm.reset();
  }
}