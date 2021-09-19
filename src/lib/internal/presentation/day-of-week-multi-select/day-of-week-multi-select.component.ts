import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-day-of-week-multi-select',
  templateUrl: './day-of-week-multi-select.component.html',
  styleUrls: ['./day-of-week-multi-select.component.css']
})
export class DayOfWeekMultiSelectComponent implements OnInit {

  daysOfTheWeek = [
    {label: 'Sunday', value: '0'},
    {label: 'Monday', value: '1'},
    {label: 'Tuesday', value: '2'},
    {label: 'Wednesday', value: '3'},
    {label: 'Thursday', value: '4'},
    {label: 'Friday', value: '5'},
    {label: 'Saturday', value: '6'},
  ];

  @Input()
  selectedValues?: string[];

  @Output()
  selectedValuesChange = new EventEmitter<string[]>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange(event: MatCheckboxChange, value: string) {
    if (event.checked) {
      this.selectedValues?.push(value);
    } else {
      const indexToRemove = this.selectedValues?.findIndex(v => v === value) ?? -1;
      if (indexToRemove > -1) {
        this.selectedValues?.splice(indexToRemove, 1);
      }
    }
    this.selectedValuesChange.emit(this.selectedValues);
  }
}
