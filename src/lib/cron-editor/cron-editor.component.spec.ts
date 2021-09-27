import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CronEditorComponent} from './cron-editor.component';
import {CronElementMode} from "../internal/presentation/cron-element-mode-selector/cron-element-mode-selector.component";

describe('CronEditorComponent', () => {
  let component: CronEditorComponent;
  let fixture: ComponentFixture<CronEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CronEditorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CronEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the cron element mode correctly', () => {
    component.cron = '* * * * *';

    component.ngOnInit();

    expect(component.minuteMode).toBe(CronElementMode.Every);
    expect(component.hourMode).toBe(CronElementMode.Every);
    expect(component.dayOfMonthMode).toBe(CronElementMode.Every);
    expect(component.monthMode).toBe(CronElementMode.Every);
    expect(component.dayOfWeekMode).toBe(CronElementMode.Every);

    component.cron = '1-2 1-2 1-2 1-2 1-2';

    component.ngOnInit();

    expect(component.minuteMode).toBe(CronElementMode.At);
    expect(component.hourMode).toBe(CronElementMode.At);
    expect(component.dayOfMonthMode).toBe(CronElementMode.At);
    expect(component.monthMode).toBe(CronElementMode.At);
    expect(component.dayOfWeekMode).toBe(CronElementMode.At);

    component.cron = '*/1 */1 */1 */1 */1';

    component.ngOnInit();

    expect(component.minuteMode).toBe(CronElementMode.Every);
    expect(component.hourMode).toBe(CronElementMode.Every);
    expect(component.dayOfMonthMode).toBe(CronElementMode.Every);
    expect(component.monthMode).toBe(CronElementMode.Every);
    expect(component.dayOfWeekMode).toBe(CronElementMode.Every);

    component.cron = '1 1 1 1 1';

    component.ngOnInit();

    expect(component.minuteMode).toBe(CronElementMode.At);
    expect(component.hourMode).toBe(CronElementMode.At);
    expect(component.dayOfMonthMode).toBe(CronElementMode.At);
    expect(component.monthMode).toBe(CronElementMode.At);
    expect(component.dayOfWeekMode).toBe(CronElementMode.At);
  });

});
