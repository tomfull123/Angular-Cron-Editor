import {Component, Input, OnInit} from '@angular/core';
import {CronElementIndex, CronElementParser} from "../../domain/cron-element-parser/cron-element-parser";

@Component({
  selector: 'app-cron-element-labels',
  templateUrl: './cron-element-labels.component.html',
  styleUrls: ['./cron-element-labels.component.css']
})
export class CronElementLabelsComponent implements OnInit {

  @Input()
  selectedCronElementIndex?: number;

  @Input()
  cron?: string;

  CronElementIndex = CronElementIndex;

  constructor(private cronElementParser: CronElementParser) {
  }

  ngOnInit(): void {
  }

  getLabelClass(elementIndex: CronElementIndex) {
    if (!this.cronElementParser.isCronElementValid(elementIndex, this.cron)) return 'invalid';
    return this.selectedCronElementIndex === elementIndex ? 'selected' : '';
  }
}
