import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CronDescriptionComponent} from './cron-description.component';

describe('CronDescriptionComponent', () => {
  let component: CronDescriptionComponent;
  let fixture: ComponentFixture<CronDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CronDescriptionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CronDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build every minute description', () => {
    component.cron = '* * * * *';
    expect(component.buildMinuteDescription()).toBe('every minute');
  });

  it('should build minute 0 description', () => {
    component.cron = '0 * * * *';
    expect(component.buildMinuteDescription()).toBe('minute 0');
  });

  it('should build every 5th minute description', () => {
    component.cron = '*/5 * * * *';
    expect(component.buildMinuteDescription()).toBe('every 5th minute');
  });

  it('should build every minute from 5 to 10 description', () => {
    component.cron = '5-10 * * * *';
    expect(component.buildMinuteDescription()).toBe('every minute from 5 through 10');
  });

  it('should build every minute from 5 to 10 description', () => {
    component.cron = '5-10,15 * * * *';
    expect(component.buildMinuteDescription()).toBe('every minute from 5 through 10 and 15');
  });

  it('should build every minute from 5 to 10 description', () => {
    component.cron = '5-10,15,*/20 * * * *';
    expect(component.buildMinuteDescription()).toBe('every minute from 5 through 10, 15 and every 20th minute');
  });

  it('should build every minute and every 2nd minute description', () => {
    component.cron = '*/1,*/2 * * * *';
    expect(component.buildMinuteDescription()).toBe('every minute and every 2nd minute');
  });

  it('should build every 2nd minute, every 3rd minute and every 4th minute description', () => {
    component.cron = '*/2,*/3,*/4 * * * *';
    expect(component.buildMinuteDescription()).toBe('every 2nd minute, every 3rd minute and every 4th minute');
  });


});
