import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cron-description',
  templateUrl: './cron-description.component.html',
  styleUrls: ['./cron-description.component.css']
})
export class CronDescriptionComponent implements OnInit {

  @Input()
  cron?: string;

  @Input()
  selectedCronElementIndex?: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
