import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronDescriptionComponent } from './cron-description.component';

describe('CronDescriptionComponent', () => {
  let component: CronDescriptionComponent;
  let fixture: ComponentFixture<CronDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronDescriptionComponent ]
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
});
