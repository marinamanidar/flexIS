import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FwaAnalyticsComponent } from './fwa-analytics.component';

describe('FwaAnalyticsComponent', () => {
  let component: FwaAnalyticsComponent;
  let fixture: ComponentFixture<FwaAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FwaAnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FwaAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
