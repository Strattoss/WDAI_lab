import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRatingsComponent } from './trip-ratings.component';

describe('TripRatingsComponent', () => {
  let component: TripRatingsComponent;
  let fixture: ComponentFixture<TripRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripRatingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
