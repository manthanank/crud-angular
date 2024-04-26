import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostAddComponent } from './posts/post-add/post-add.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostAddComponent,
    PostDetailsComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
