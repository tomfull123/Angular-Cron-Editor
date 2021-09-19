import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CronNextTimeComponent} from './cron-next-time.component';

describe('CronNextTimeComponent', () => {
  let component: CronNextTimeComponent;
  let fixture: ComponentFixture<CronNextTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CronNextTimeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CronNextTimeComponent);
    component = fixture.componentInstance;
    component.unexpandedNextTimeCount = 7;
    component.currentTime = new Date(2021, 5, 7, 8, 9);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be next every minute', () => {
    component.cron = "* * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 08:09:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 08:10:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 08:11:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 08:12:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 08:13:00');
    expect(times[5].toLocaleString()).toBe('07/06/2021, 08:14:00');
    expect(times[6].toLocaleString()).toBe('07/06/2021, 08:15:00');
  });

  it('should be the next 5 to 10 minute', () => {
    component.cron = "5-10 * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 08:09:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 08:10:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 09:05:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 09:06:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 09:07:00');
    expect(times[5].toLocaleString()).toBe('07/06/2021, 09:08:00');
    expect(times[6].toLocaleString()).toBe('07/06/2021, 09:09:00');
  });

  it('should be the next every 10 minute', () => {
    component.cron = "*/10 * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 08:10:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 08:20:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 08:30:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 08:40:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 08:50:00');
    expect(times[5].toLocaleString()).toBe('07/06/2021, 09:00:00');
    expect(times[6].toLocaleString()).toBe('07/06/2021, 09:10:00');
  });

  it('should be the next every 10 minute with a 3 minute offset', () => {
    component.cron = "3/10 * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 08:13:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 08:23:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 08:33:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 08:43:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 08:53:00');
    expect(times[5].toLocaleString()).toBe('07/06/2021, 09:03:00');
    expect(times[6].toLocaleString()).toBe('07/06/2021, 09:13:00');
  });

  it('should be the next 5th minute', () => {
    component.cron = "5 * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 09:05:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 10:05:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 11:05:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 12:05:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 13:05:00');
    expect(times[5].toLocaleString()).toBe('07/06/2021, 14:05:00');
    expect(times[6].toLocaleString()).toBe('07/06/2021, 15:05:00');
  });

  it('should be the next 5th or 8th minute', () => {
    component.cron = "5,8 * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 09:05:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 09:08:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 10:05:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 10:08:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 11:05:00');
    expect(times[5].toLocaleString()).toBe('07/06/2021, 11:08:00');
    expect(times[6].toLocaleString()).toBe('07/06/2021, 12:05:00');
  });

  it('should be the next 3rd day', () => {
    component.cron = "0 0 */3 * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('09/06/2021, 00:00:00');
    expect(times[1].toLocaleString()).toBe('12/06/2021, 00:00:00');
    expect(times[2].toLocaleString()).toBe('15/06/2021, 00:00:00');
    expect(times[3].toLocaleString()).toBe('18/06/2021, 00:00:00');
    expect(times[4].toLocaleString()).toBe('21/06/2021, 00:00:00');
    expect(times[5].toLocaleString()).toBe('24/06/2021, 00:00:00');
    expect(times[6].toLocaleString()).toBe('27/06/2021, 00:00:00');
  });

  it('should be the next 3rd day if its a monday', () => {
    component.cron = "0 0 */3 * 1";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('21/06/2021, 00:00:00');
    expect(times[1].toLocaleString()).toBe('12/07/2021, 00:00:00');
    expect(times[2].toLocaleString()).toBe('09/08/2021, 00:00:00');
    expect(times[3].toLocaleString()).toBe('30/08/2021, 00:00:00');
    expect(times[4].toLocaleString()).toBe('06/09/2021, 00:00:00');
    expect(times[5].toLocaleString()).toBe('27/09/2021, 00:00:00');
    expect(times[6].toLocaleString()).toBe('18/10/2021, 00:00:00');
  });

  it('should be the next January every year', () => {
    component.cron = "0 0 1 1 *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('01/01/2022, 00:00:00');
    expect(times[1].toLocaleString()).toBe('01/01/2023, 00:00:00');
    expect(times[2].toLocaleString()).toBe('01/01/2024, 00:00:00');
    expect(times[3].toLocaleString()).toBe('01/01/2025, 00:00:00');
    expect(times[4].toLocaleString()).toBe('01/01/2026, 00:00:00');
    expect(times[5].toLocaleString()).toBe('01/01/2027, 00:00:00');
    expect(times[6].toLocaleString()).toBe('01/01/2028, 00:00:00');
  });

  it('should ignore duplicate values', () => {
    component.cron = "1,1,2,2,3 * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 09:01:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 09:02:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 09:03:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 10:01:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 10:02:00');
    expect(times[5].toLocaleString()).toBe('07/06/2021, 10:03:00');
    expect(times[6].toLocaleString()).toBe('07/06/2021, 11:01:00');
  });

  it('should sort unordered values', () => {
    component.cron = "3,2,1,49,12 * * * *";
    const times = component.getNextTimes();
    expect(times.length).toBe(7);
    expect(times[0].toLocaleString()).toBe('07/06/2021, 08:12:00');
    expect(times[1].toLocaleString()).toBe('07/06/2021, 08:49:00');
    expect(times[2].toLocaleString()).toBe('07/06/2021, 09:01:00');
    expect(times[3].toLocaleString()).toBe('07/06/2021, 09:02:00');
    expect(times[4].toLocaleString()).toBe('07/06/2021, 09:03:00');
    expect(times[5].toLocaleString()).toBe('07/06/2021, 09:12:00');
    expect(times[6].toLocaleString()).toBe('07/06/2021, 09:49:00');
  });

});
