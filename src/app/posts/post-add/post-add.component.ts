import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.scss'
})
export class PostAddComponent implements OnInit {
  postForm: FormGroup;

  dataService = inject(DataService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }
    this.dataService.createPost(this.postForm.value).subscribe((data) => {
      // console.log(data);
      this.router.navigate(['/posts']); // Redirect to posts page after adding
    });
  }
}