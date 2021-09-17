import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CronElementLabelsComponent} from './cron-element-labels.component';

describe('CronElementLabelsComponent', () => {
  let component: CronElementLabelsComponent;
  let fixture: ComponentFixture<CronElementLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CronElementLabelsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CronElementLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
