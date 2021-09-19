import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CronElementIndex, CronTokenValidator} from "../internal/domain/cron-token-validator/cron-token-validator";
import {CronElementParser} from "../internal/domain/cron-element-parser/cron-element-parser";

@Component({
  selector: 'app-cron-next-time',
  templateUrl: './cron-next-time.component.html',
  styleUrls: ['./cron-next-time.component.css']
})
export class CronNextTimeComponent implements OnInit, OnDestroy {

  private _currentTime?: Date;

  @Input()
  cron?: string;

  @Input()
  set currentTime(currentTime: Date) {
    this._currentTime = currentTime;
  }

  get currentTime() {
    return this._currentTime ?? new Date(Date.now())
  }

  @Input()
  expanded = false;

  @Output()
  expandedChange = new EventEmitter<boolean>();

  @Input()
  unexpandedNextTimeCount = 1;

  @Input()
  expandedNextTimeCount = 5;

  nextTimes: Date[] = [];
  nextTimesInterval?: number;

  constructor() {
  }

  ngOnInit(): void {
    this.updateNextTimes();
    this.nextTimesInterval = setInterval(() => {
      this.updateNextTimes();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.nextTimesInterval);
  }

  updateNextTimes() {
    this.nextTimes = this.getNextTimes();
  }

  getNextTimes(): Date[] {
    if (!this.isCronValid()) return [];
    if (this.cron == null) return [];
    const times: Date[] = [];

    const minuteValues = this.getValues(CronElementIndex.Minute);
    const hourValues = this.getValues(CronElementIndex.Hour);
    const dayOfWeekValues = this.getValues(CronElementIndex.DayOfWeek);
    const dayOfMonthValues = this.getValues(CronElementIndex.DayOfMonth);
    const monthValues = this.getValues(CronElementIndex.Month);

    let year = this.currentTime.getFullYear();

    while (true) {
      for (const month of monthValues) {
        const date = new Date(year, month - 1, 1, 0, 0, 0, 0);
        if (date < this.currentTime && month <= this.currentTime.getMonth()) continue;
        for (const dayOfMonth of dayOfMonthValues) {
          date.setDate(dayOfMonth);
          if (date < this.currentTime && dayOfMonth < this.currentTime.getDate()) continue;
          if (!dayOfWeekValues.includes(date.getDay())) continue;
          for (const hour of hourValues) {
            date.setHours(hour);
            if (date < this.currentTime && hour < this.currentTime.getHours()) continue;
            for (const minute of minuteValues) {
              date.setMinutes(minute);
              if (date < this.currentTime && minute <= this.currentTime.getMinutes()) continue;
              times.push(new Date(date));
              if (times.length === this.getNextTimeCount()) return times;
            }
          }
        }
      }
      year++;
    }

    return times;
  }

  isCronValid(): boolean {
    return CronElementParser.isCronValid(this.cron);
  }

  private getValues(elementIndex: CronElementIndex): number[] {
    const tokens = CronElementParser.parseCronElement(this.cron!, elementIndex);
    const values: number[] = [];
    const minValue = CronTokenValidator.CRON_ELEMENT_MIN_VALUES[elementIndex];
    const maxValue = CronTokenValidator.CRON_ELEMENT_MAX_VALUES[elementIndex] + 1;

    tokens?.filter(t => t.value !== ',').forEach(token => {
      if (token.value.includes('/')) {
        const steppedValues = token.value.split('/');
        const firstValue = steppedValues[0];
        const secondValue = Number(steppedValues[1]);
        if (firstValue === '*') {
          values.push(...Array.from(Array(Math.ceil(maxValue / secondValue)).keys()).map(i => i * secondValue));
        } else {
          // Non standard cron format
          const firstValueAsNumber = Number(firstValue);
          values.push(...Array.from(Array(Math.ceil((maxValue - firstValueAsNumber) / secondValue)).keys()).map(i => (i * secondValue) + firstValueAsNumber));
        }
      } else if (token.value.includes('-')) { // Range values
        const rangeValues = token.value.split('-');
        const startValue = Number(rangeValues[0]);
        const endValue = Number(rangeValues[1]);
        const count = (endValue - startValue) + 1;
        values.push(...Array.from(Array(count).keys()).map(i => i + startValue))
      }
      if (token.value === '*') {
        values.push(...Array.from(Array(maxValue).keys()).map(i => i))
      } else {
        const valueAsNumber = Number(token.value);
        if (!isNaN(valueAsNumber)) values.push(valueAsNumber);
      }
    });

    return [...new Set(values.filter(v => v >= minValue).sort((a, b) => a - b))];
  }

  private getNextTimeCount(): number {
    return this.expanded ? this.expandedNextTimeCount : this.unexpandedNextTimeCount;
  }

}
