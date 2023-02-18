import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHistoryTileComponent } from './purchase-history-tile.component';

describe('PurchaseHistoryTileComponent', () => {
  let component: PurchaseHistoryTileComponent;
  let fixture: ComponentFixture<PurchaseHistoryTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseHistoryTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseHistoryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
