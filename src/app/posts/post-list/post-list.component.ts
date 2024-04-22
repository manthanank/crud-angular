import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Posts } from '../../models/post';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
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
