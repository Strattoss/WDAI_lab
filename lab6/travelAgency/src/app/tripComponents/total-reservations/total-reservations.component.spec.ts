import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReservationsComponent } from './total-reservations.component';

describe('TotalReservationsComponent', () => {
  let component: TotalReservationsComponent;
  let fixture: ComponentFixture<TotalReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
