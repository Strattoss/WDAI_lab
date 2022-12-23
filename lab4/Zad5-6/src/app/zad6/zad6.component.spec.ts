import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zad6Component } from './zad6.component';

describe('Zad6Component', () => {
  let component: Zad6Component;
  let fixture: ComponentFixture<Zad6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zad6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zad6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
