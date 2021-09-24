import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

export enum InputType {
  Text = "text",
  Number = "number"
}

@Component({
  selector: 'lib-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input()
  values: string[] = [];

  @Output()
  valuesChange = new EventEmitter<string[]>();

  @Input()
  inputType: InputType = InputType.Text;

  @Input()
  placeholder: string = '';

  @Input()
  min?: number;

  @Input()
  max?: number;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
  }

  ngOnInit(): void {
  }

  addValue(event: MatChipInputEvent) {
    const input = event.chipInput;
    const value = event.value?.trim();

    if (value) {
      if (this.inputType === InputType.Number) {
        const valueAsNumber = Number(value);
        if ((this.min == null || valueAsNumber >= this.min) && (this.max == null || valueAsNumber <= this.max)) {
          this.values.push(value);
        }
      } else {
        this.values.push(value);
      }
    }

    // Remove duplicates
    this.values = [...new Set(this.values)];

    input?.clear();
    this.valuesChange.emit(this.values);
  }

  removeValue(value: string) {
    const indexToRemove = this.values.indexOf(value);

    if (indexToRemove >= 0) {
      this.values.splice(indexToRemove, 1);
    }

    this.valuesChange.emit(this.values);
  }
}
