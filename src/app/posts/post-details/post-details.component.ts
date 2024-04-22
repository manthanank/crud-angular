import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { Post } from '../../models/post';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [NgIf, AsyncPipe],
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
