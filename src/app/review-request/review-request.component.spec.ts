import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewiewRequestComponent } from './review-request.component';

describe('RewiewRequestComponent', () => {
  let component: RewiewRequestComponent;
  let fixture: ComponentFixture<RewiewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewiewRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewiewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
