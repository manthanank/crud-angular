import { Component, OnInit, inject } from '@angular/core';
import { Posts } from '../../models/post';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  posts: Posts[] = [];
  
  dataService = inject(DataService);
  router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.dataService.getPosts().subscribe((data) => {
      // console.log(data);
      this.posts = data;
    });
  }

  viewPost(id: number) {
    this.router.navigate(['/posts/details', id]);
  }

  addPost() {
    this.router.navigate(['/posts/add']);
  }

  deletePost(id: number) {
    this.dataService.deletePost(id).subscribe((data) => {
      console.log(data);
    });
  }

  editPost(id: number) {
    this.router.navigate(['/posts/edit', id]);
  }
}
