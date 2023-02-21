import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSchedulesComponent } from './review-schedules.component';

describe('ReviewSchedulesComponent', () => {
  let component: ReviewSchedulesComponent;
  let fixture: ComponentFixture<ReviewSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
