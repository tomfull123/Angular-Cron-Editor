import {Component, Input, OnInit} from '@angular/core';
import {CronElementParser} from "../../domain/cron-element-parser/cron-element-parser";
import {CronElementToken} from "../../domain/cron-element-token/cron-element-token";
import {CronElementIndex} from "../../domain/cron-token-validator/cron-token-validator";

@Component({
  selector: 'app-cron-description',
  templateUrl: './cron-description.component.html',
  styleUrls: ['./cron-description.component.css']
})
export class CronDescriptionComponent implements OnInit {

  static WEEKDAY_MAP = {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday',
  };

  static MONTH_NAME_MAP = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  @Input()
  cron?: string;

  @Input()
  selectedCronElementIndex?: number;

  CronElementIndex = CronElementIndex;

  constructor() {
  }

  ngOnInit(): void {
  }

  buildMinuteDescription(): string {
    return this.buildCronElementDescription(CronElementIndex.Minute, '59', 'minute', '');
  }

  buildHourDescription(): string {
    return this.buildCronElementDescription(CronElementIndex.Hour, '23', 'hour', 'past');
  }

  buildDayOfWeekDescription(): string {
    return this.buildCronElementDescription(CronElementIndex.DayOfWeek, '6', 'day-of-week', 'on', CronDescriptionComponent.WEEKDAY_MAP);
  }

  buildDayOfMonthDescription(): string {
    return this.buildCronElementDescription(CronElementIndex.DayOfMonth, '31', 'day-of-month', 'on');
  }

  buildMonthDescription(): string {
    return this.buildCronElementDescription(CronElementIndex.Month, '12', 'month', 'in', CronDescriptionComponent.MONTH_NAME_MAP);
  }

  private buildCronElementDescription(elementIndex: CronElementIndex, maxValue: string, unitName: string, descriptionPrefix: string, unSteppedValueMap: { [value: string]: string } = {}): string {
    if (!this.cron) return '';
    const cronElements = this.cron.split(' ');
    if (cronElements.length !== 5) return '';
    if (cronElements[elementIndex] === '*' && elementIndex !== CronElementIndex.Minute) return '';
    const tokens = CronElementParser.parseCronElement(this.cron, elementIndex);
    if (!tokens) return '';

    const descriptionComponents: string[] = [];
    let needsUnitPrefix = Object.keys(unSteppedValueMap).length === 0; // Include the prefix if we don't have mapped values

    tokens.forEach((t, i) => {
      switch (t.value) {
        case '*':
          descriptionComponents.push(`every ${unitName}`);
          needsUnitPrefix = false;
          break;
        case ',':
          const isLastComma = tokens.findLastIndex((token: CronElementToken) => token.value === ',') === i;
          if (isLastComma) {
            descriptionComponents.push('and');
          } else {
            descriptionComponents.push(',');
          }
          break;
        default:
          if (t.value.includes('/')) { // Stepped values
            const stepValues = t.value.split('/');
            if (stepValues.length === 2) {
              const rangeString = this.getRangeValuesDescription(stepValues[0], unSteppedValueMap, maxValue);
              let stepValueString = `every${stepValues[1] === '1' ? '' : ` ${this.ordinalSuffixOf(parseInt(stepValues[1]))}`} ${unitName}`;
              if (rangeString !== '*') stepValueString += ` from ${rangeString}`;
              descriptionComponents.push(stepValueString);
            }
          } else if (t.value.includes('-')) { // Range values
            descriptionComponents.push(`every ${needsUnitPrefix ? `${unitName} ` : ''}from ${this.getRangeValuesDescription(t.value, unSteppedValueMap)}`);
          } else {
            descriptionComponents.push(`${needsUnitPrefix ? `${unitName} ` : ''}${unSteppedValueMap[t.value] ?? t.value}`);
          }
          needsUnitPrefix = false;
          break;
      }
    });

    const descriptionString = descriptionComponents.join(' ').replace(/\s,/g, ',');

    if (descriptionPrefix) {
      return ` ${descriptionPrefix} ${descriptionString}`;
    } else {
      return descriptionString;
    }
  }

  private getRangeValuesDescription(tokenValue: string, unSteppedValueMap: { [value: string]: string }, defaultRangeValue?: string): string {
    let rangeStart = tokenValue;
    let rangeEnd = defaultRangeValue;
    if (tokenValue.includes('-')) {
      const rangeValues = tokenValue.split('-');
      rangeStart = rangeValues[0];
      rangeEnd = rangeValues.length === 2 ? rangeValues[1] : defaultRangeValue;
    }

    if (rangeStart !== '*' && rangeEnd != null) {
      const mappedRangeStart = unSteppedValueMap[rangeStart] ?? rangeStart;
      const mappedRangeEnd = unSteppedValueMap[rangeEnd] ?? rangeEnd;
      return `${mappedRangeStart} through ${mappedRangeEnd}`;
    }

    return unSteppedValueMap[tokenValue] ?? tokenValue;
  }

  private ordinalSuffixOf(i: number) {
    const j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + 'st';
    }
    if (j === 2 && k !== 12) {
      return i + 'nd';
    }
    if (j === 3 && k !== 13) {
      return i + 'rd';
    }
    return i + 'th';
  }

  isCronValid(): boolean {
    return CronElementParser.isCronValid(this.cron);
  }

  getDescriptionClass(elementIndex: CronElementIndex) {
    return this.selectedCronElementIndex === elementIndex ? 'selected' : '';
  }

}

