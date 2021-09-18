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
    component.unexpandedNextTimeCount = 5;
    component.currentTime = new Date(2021, 5, 7, 8, 9);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be next every minute', () => {
    component.cron = "* * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(5);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 08:09:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 08:10:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 08:11:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 08:12:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 08:13:00');
  });

  it('should be next 5 to 10 minute', () => {
    component.cron = "5-10 * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(5);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 08:09:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 08:10:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 09:05:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 09:06:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 09:07:00');
  });


});
