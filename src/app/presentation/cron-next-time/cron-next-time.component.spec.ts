import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronNextTimeComponent } from './cron-next-time.component';

describe('CronNextTimeComponent', () => {
  let component: CronNextTimeComponent;
  let fixture: ComponentFixture<CronNextTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronNextTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CronNextTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
