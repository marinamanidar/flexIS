import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpSchComponent } from './view-emp-sch.component';

describe('ViewEmpSchComponent', () => {
  let component: ViewEmpSchComponent;
  let fixture: ComponentFixture<ViewEmpSchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpSchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmpSchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
