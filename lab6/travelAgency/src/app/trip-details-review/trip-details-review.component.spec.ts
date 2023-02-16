import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsReviewComponent } from './trip-details-review.component';

describe('TripDetailsReviewComponent', () => {
  let component: TripDetailsReviewComponent;
  let fixture: ComponentFixture<TripDetailsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetailsReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetailsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
