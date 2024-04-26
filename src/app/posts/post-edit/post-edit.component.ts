import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.scss'
})
export class PostEditComponent implements OnInit {
  postForm: FormGroup;
  postId: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.dataService.getPostById(this.postId).subscribe((data) => {
      this.postForm = this.fb.group({
        title: [data.title, Validators.required],
        body: [data.body, Validators.required]
      });
    });
  }

  onSubmit(): void {
    this.dataService.updatePost(this.postForm.value).subscribe((data) => {
      this.router.navigate(['/posts']);
    });
  }
}