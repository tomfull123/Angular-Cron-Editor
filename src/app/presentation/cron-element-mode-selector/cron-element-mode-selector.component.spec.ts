import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronElementModeSelectorComponent } from './cron-element-mode-selector.component';

describe('CronElementModeSelectorComponent', () => {
  let component: CronElementModeSelectorComponent;
  let fixture: ComponentFixture<CronElementModeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronElementModeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CronElementModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
