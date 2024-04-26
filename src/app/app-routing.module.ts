import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostAddComponent } from './posts/post-add/post-add.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts',
},
{
    path: 'posts',
    component: PostListComponent
},
{
    path: 'posts/add',
    component: PostAddComponent
},
{
    path: 'posts/details/:id',
    component: PostDetailsComponent
},
{
    path: 'posts/edit/:id',
    component: PostEditComponent
},
{
    path: '**',
    redirectTo: 'posts',
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
