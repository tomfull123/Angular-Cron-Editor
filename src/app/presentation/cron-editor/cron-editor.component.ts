import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CronElementMode} from "../cron-element-mode-selector/cron-element-mode-selector.component";

@Component({
  selector: 'app-cron-editor',
  templateUrl: './cron-editor.component.html',
  styleUrls: ['./cron-editor.component.css']
})
export class CronEditorComponent implements OnInit {

  private _cron: string = '';

  @Input()
  set cron(cron: string) {
    if(this._cron !== cron) {
      this._cron = cron;
      this.cronChange.emit(cron);
    }
  }

  get cron() {
    return this._cron;
  }

  @Output()
  cronChange = new EventEmitter<string>();

  minuteMode = CronElementMode.Every;
  hourMode = CronElementMode.Every;
  dayOfWeekMode = CronElementMode.Every;
  dayOfMonthMode = CronElementMode.Every;
  monthMode = CronElementMode.Every;



  constructor() { }

  ngOnInit(): void {
  }

}
