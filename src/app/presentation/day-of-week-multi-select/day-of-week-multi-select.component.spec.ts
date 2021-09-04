import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekMultiSelectComponent } from './day-of-week-multi-select.component';

describe('DayOfWeekMultiSelectComponent', () => {
  let component: DayOfWeekMultiSelectComponent;
  let fixture: ComponentFixture<DayOfWeekMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayOfWeekMultiSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
