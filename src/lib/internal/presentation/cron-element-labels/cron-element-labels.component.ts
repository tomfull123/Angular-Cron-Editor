import {Component, Input, OnInit} from '@angular/core';
import {CronElementParser} from "../../domain/cron-element-parser/cron-element-parser";
import {CronElementIndex} from '../../domain/cron-token-validator/cron-token-validator';

@Component({
  selector: 'lib-cron-element-labels',
  templateUrl: './cron-element-labels.component.html',
  styleUrls: ['./cron-element-labels.component.css']
})
export class CronElementLabelsComponent implements OnInit {

  @Input()
  selectedCronElementIndex?: number;

  @Input()
  cron?: string;

  CronElementIndex = CronElementIndex;

  constructor() {
  }

  ngOnInit(): void {
  }

  getLabelClass(elementIndex: CronElementIndex) {
    if (!CronElementParser.isCronElementValid(elementIndex, this.cron)) return 'invalid';
    return this.selectedCronElementIndex === elementIndex ? 'selected' : '';
  }
}
