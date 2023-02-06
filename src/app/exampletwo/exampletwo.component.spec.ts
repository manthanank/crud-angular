import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampletwoComponent } from './exampletwo.component';

describe('ExampletwoComponent', () => {
  let component: ExampletwoComponent;
  let fixture: ComponentFixture<ExampletwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampletwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampletwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
