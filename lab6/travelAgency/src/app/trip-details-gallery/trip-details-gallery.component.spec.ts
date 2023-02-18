import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsGalleryComponent } from './trip-details-gallery.component';

describe('TripDetailsGalleryComponent', () => {
  let component: TripDetailsGalleryComponent;
  let fixture: ComponentFixture<TripDetailsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetailsGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetailsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
