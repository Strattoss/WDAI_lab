import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectYourCarComponent } from './select-your-car.component';

describe('SelectYourCarComponent', () => {
  let component: SelectYourCarComponent;
  let fixture: ComponentFixture<SelectYourCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectYourCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectYourCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
