import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CronElementIndex} from '../internal/domain/cron-token-validator/cron-token-validator';
import {CronElementMode} from '../internal/presentation/cron-element-mode-selector/cron-element-mode-selector.component';
import {InputType} from '../internal/presentation/multi-select/multi-select.component';
import {CronElementParser} from "../internal/domain/cron-element-parser/cron-element-parser";

@Component({
  selector: 'cron-editor',
  templateUrl: './cron-editor.component.html',
  styleUrls: ['./cron-editor.component.css']
})
export class CronEditorComponent implements OnInit {

  private _cron?: string;
  CronElementMode = CronElementMode;
  CronElementIndex = CronElementIndex;
  InputType = InputType;
  currentTabIndex = 0;
  _cronInputCursorPosition = -1

  @Input()
  set cron(cron: string | undefined) {
    if (this._cron !== cron) {
      this._cron = cron;
      this.cronChange.emit(cron);
    }
  }

  get cron() {
    return this._cron;
  }

  @Output()
  cronChange = new EventEmitter<string>();

  @Output()
  selectedCronElementIndexChange = new EventEmitter<number>();

  get minuteValues(): string[] {
    return this.getCronElementValues(CronElementIndex.Minute);
  }

  set minuteValues(minutes) {
    this.setCronElementValues(CronElementIndex.Minute, minutes, this.minuteMode);
  }

  get hourValues(): string[] {
    return this.getCronElementValues(CronElementIndex.Hour);
  }

  set hourValues(hours) {
    this.setCronElementValues(CronElementIndex.Hour, hours, this.hourMode);
  }

  get dayOfWeekValues(): string[] {
    return this.getCronElementValues(CronElementIndex.DayOfWeek);
  }

  set dayOfWeekValues(daysOfWeek) {
    this.setCronElementValues(CronElementIndex.DayOfWeek, daysOfWeek, this.dayOfWeekMode);
  }

  get dayOfMonthValues(): string[] {
    return this.getCronElementValues(CronElementIndex.DayOfMonth);
  }

  set dayOfMonthValues(daysOfMonth) {
    this.setCronElementValues(CronElementIndex.DayOfMonth, daysOfMonth, this.dayOfMonthMode);
  }

  get monthValues(): string[] {
    return this.getCronElementValues(CronElementIndex.Month);
  }

  set monthValues(months) {
    this.setCronElementValues(CronElementIndex.Month, months, this.monthMode);
  }

  get selectedCronElementIndex(): number {
    switch (this.currentTabIndex) {
      case 0: // Minutes
        return CronElementIndex.Minute;
      case 1: // Hours
        return CronElementIndex.Hour;
      case 2: // Day of week
        return CronElementIndex.DayOfWeek;
      case 3: // Day of month
        return CronElementIndex.DayOfMonth;
      case 4: // Month
        return CronElementIndex.Month;
      case 5: // Advanced
        const cronElements = this.cron!.split(' ');
        let cronLengthTotal = 0;
        for (let i = 0; i < cronElements.length; i++) {
          const element = cronElements[i];
          if (this.cronInputCursorPosition >= cronLengthTotal && this.cronInputCursorPosition <= cronLengthTotal + element.length) {
            return i;
          }
          cronLengthTotal += element.length + 1;
        }
    }

    return -1;
  }

  get cronInputCursorPosition() {
    return this._cronInputCursorPosition;
  }

  set cronInputCursorPosition(cronInputCursorPosition) {
    if (this._cronInputCursorPosition !== cronInputCursorPosition) {
      this._cronInputCursorPosition = cronInputCursorPosition;
      this.updateSelectedCronElementIndexChange();
    }
  }

  minuteMode = CronElementMode.Every;
  hourMode = CronElementMode.Every;
  dayOfWeekMode = CronElementMode.Every;
  dayOfMonthMode = CronElementMode.Every;
  monthMode = CronElementMode.Every;

  constructor() {
  }

  ngOnInit(): void {
    this.updateSelectedCronElementIndexChange();
    this.updateCronElementModes();
  }

  private getCronElementValues(cronIndex: number): string[] {
    const cronElement = CronElementParser.parseCronElement(this.cron!, cronIndex)
      ?.filter(t => t.valid)
      ?.map(t => t.value)
      ?.join('');
    if (cronElement == null || cronElement === '*') return [];
    const valueList = cronElement.split(',').filter(v => v !== '');
    return valueList.map(v => {
      const stepValues = v.split('/');
      if (stepValues.length === 2) return stepValues[1];
      return v;
    })
  }

  private setCronElementValues(elementIndex: CronElementIndex, values: string[], cronElementMode: CronElementMode) {
    const cronElements = this.cron!.split(' ');

    if (values.length === 0) {
      cronElements[elementIndex] = '*';
    } else {
      if (cronElementMode === CronElementMode.Every) {
        cronElements[elementIndex] = values.map(v => `*/${v}`).join(',');
      } else {
        cronElements[elementIndex] = values.join(',');
      }
    }

    this.cron = cronElements.join(' ');
  }

  refreshCronElement(elementIndex: CronElementIndex, mode: CronElementMode) {
    this.setCronElementValues(elementIndex, this.getCronElementValues(elementIndex), mode);
  }

  clearCronElement(elementIndex: CronElementIndex) {
    const cronElements = this.cron!.split(' ');
    cronElements[elementIndex] = '*';
    this.cron = cronElements.join(' ');
  }

  resetCursorPos() {
    this.cronInputCursorPosition = -1
  }

  getCursorPos(cronInput: HTMLInputElement) {
    if (cronInput.selectionStart != null) {
      this.cronInputCursorPosition = cronInput.selectionStart;
    }
  }

  updateSelectedCronElementIndexChange() {
    this.selectedCronElementIndexChange.emit(this.selectedCronElementIndex);
  }

  private updateCronElementModes() {
    this.minuteMode = this.getCronElementMode(CronElementIndex.Minute);
    this.hourMode = this.getCronElementMode(CronElementIndex.Hour);
    this.dayOfMonthMode = this.getCronElementMode(CronElementIndex.DayOfMonth);
    this.monthMode = this.getCronElementMode(CronElementIndex.Month);
    this.dayOfWeekMode = this.getCronElementMode(CronElementIndex.DayOfWeek);
  }

  private getCronElementMode(elementIndex: CronElementIndex): CronElementMode {
    const values = CronElementParser.parseCronElement(this.cron!, elementIndex)
      ?.filter(t => t.valid)
      ?.map(t => t.value);
    if (values == null || values.length === 0 || values[0] === '*' || values[0].includes('/')) return CronElementMode.Every;
    return CronElementMode.At;
  }
}
