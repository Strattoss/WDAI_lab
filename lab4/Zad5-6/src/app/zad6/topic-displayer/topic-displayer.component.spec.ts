import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDisplayerComponent } from './topic-displayer.component';

describe('TopicDisplayerComponent', () => {
  let component: TopicDisplayerComponent;
  let fixture: ComponentFixture<TopicDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
