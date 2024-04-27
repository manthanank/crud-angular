import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'age', 'edit', 'delete'];
  dataSource: any;

  editMode = false;

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
    this.dataService.getUsers().subscribe(users => {
      this.dataSource = users;
    });
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
      if (this.editMode) {
        this.dataService.updateUser(this.userForm.value).subscribe(data => {
          this.getUser();
        })
      }
      else {
        this.dataService.addUser(this.userForm.value).subscribe(data => {
          this.getUser();
        })
      }
    }
    this.userForm.reset();
  }

  onDelete(id: any) {
    if (confirm("Are you sure?")) {
      this.dataService.deleteUser(id).subscribe(data => {
        this.getUser();
      });
    }
  }

  onReset() {
    this.userForm.reset();
  }
}
