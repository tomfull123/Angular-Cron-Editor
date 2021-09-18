import {Component, Input, OnInit} from '@angular/core';
import {CronElementParser} from "../../domain/cron-element-parser/cron-element-parser";
import {CronElementIndex, CronTokenValidator} from "../../domain/cron-token-validator/cron-token-validator";

@Component({
  selector: 'app-cron-next-time',
  templateUrl: './cron-next-time.component.html',
  styleUrls: ['./cron-next-time.component.css']
})
export class CronNextTimeComponent implements OnInit {

  @Input()
  cron?: string;

  @Input()
  currentTime: Date = new Date(Date.now());

  constructor() {
  }

  ngOnInit(): void {
  }

  getNextTimes(): Date[] {
    if (this.cron == null) return [];
    const times: Date[] = [];

    const minuteValues = this.getValues(CronElementIndex.Minute);
    const hourValues = this.getValues(CronElementIndex.Hour);
    const dayOfWeekValues = this.getValues(CronElementIndex.DayOfWeek);
    const dayOfMonthValues = this.getValues(CronElementIndex.DayOfMonth);
    const monthValues = this.getValues(CronElementIndex.Month);

    for (const month of monthValues) {
      const date = new Date(this.currentTime.getFullYear(), month - 1, 1, 0, 0, 0, 0);
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
            if (times.length === 5) return times;
          }
        }
      }
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
          values.push(...Array.from(Array(maxValue / secondValue).keys()).map(i => i * secondValue));
        } else {
          // Non standard cron format
          const firstValueAsNumber = Number(firstValue);
          values.push(...Array.from(Array(Math.floor((maxValue - firstValueAsNumber) / secondValue)).keys()).map(i => (i * secondValue) + firstValueAsNumber));
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

    return values.filter(v => v >= minValue);
  }


}
