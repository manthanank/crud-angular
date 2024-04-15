import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleoneComponent } from './exampleone/exampleone.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'exampleone', component: ExampleoneComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
