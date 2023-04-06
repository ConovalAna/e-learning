import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideWithVideoComponent } from './slide-with-video.component';

describe('SlideWithVideoComponent', () => {
  let component: SlideWithVideoComponent;
  let fixture: ComponentFixture<SlideWithVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideWithVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideWithVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
