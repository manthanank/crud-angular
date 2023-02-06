import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { ExampleoneService } from '../shared/exampleone/exampleone.service';

@Component({
  selector: 'app-exampleone',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './exampleone.component.html',
  styleUrls: ['./exampleone.component.scss']
})
export class ExampleoneComponent implements OnInit {

  displayedColumns: string[] = ['name', 'age', 'edit', 'delete'];
  dataSource: any;

  editMode = false;

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private exampleoneService: ExampleoneService) { }

  ngOnInit(): void {
    this.getUser();
    this.userForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  getUser() {
    this.exampleoneService.getUsers().subscribe(users => {
      this.dataSource = users;
    });
  }

  onEdit(user: any) {
    this.editMode = true;
    this.userForm.patchValue(user);
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.editMode) {
        this.exampleoneService.updateUser(this.userForm.value).subscribe(data => {
          this.getUser();
        })
      }
      else {
        this.exampleoneService.addUser(this.userForm.value).subscribe(data => {
          this.getUser();
        })
      }
    }
    this.userForm.reset();
  }

  onDelete(id: any) {
    if (confirm("Are you sure?")) {
      this.exampleoneService.deleteUser(id).subscribe(data => {
        this.getUser();
      });
    }
  }

  onReset() {
    this.userForm.reset();
  }
}
