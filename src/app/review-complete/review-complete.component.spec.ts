import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCompleteComponent } from './review-complete.component';

describe('ReviewCompleteComponent', () => {
  let component: ReviewCompleteComponent;
  let fixture: ComponentFixture<ReviewCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
