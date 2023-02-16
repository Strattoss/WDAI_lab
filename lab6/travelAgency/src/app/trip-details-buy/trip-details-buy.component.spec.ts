import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsBuyComponent } from './trip-details-buy.component';

describe('TripDetailsBuyComponent', () => {
  let component: TripDetailsBuyComponent;
  let fixture: ComponentFixture<TripDetailsBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetailsBuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetailsBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
