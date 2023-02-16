import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsRatingsComponent } from './trip-details-ratings.component';

describe('TripDetailsRatingsComponent', () => {
  let component: TripDetailsRatingsComponent;
  let fixture: ComponentFixture<TripDetailsRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetailsRatingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetailsRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
