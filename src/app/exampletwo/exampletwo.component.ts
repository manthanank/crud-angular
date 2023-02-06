import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';

@Component({
  selector: 'app-exampletwo',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './exampletwo.component.html',
  styleUrls: ['./exampletwo.component.scss']
})
export class ExampletwoComponent {

}
