import { Component, OnInit, inject } from '@angular/core';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  post: Post;

  router = inject(ActivatedRoute);
  dataService = inject(DataService);

  constructor(){
    this.post = {
      id: 0,
      userId: 0,
      title: '',
      body: ''
    };
  }

  ngOnInit(): void {
    this.router.params.pipe(
      switchMap(params => {
        return this.dataService.getPostById(params['id']);
      })
    ).subscribe((data) => {
      // console.log(data);
      this.post = data;
    });
  }
}