import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export enum CronElementMode {
  Every = 'every',
  At = 'at'
}

@Component({
  selector: 'app-cron-element-mode-selector',
  templateUrl: './cron-element-mode-selector.component.html',
  styleUrls: ['./cron-element-mode-selector.component.css']
})
export class CronElementModeSelectorComponent implements OnInit {

  private _mode: CronElementMode = CronElementMode.Every;

  @Input()
  set mode(mode: CronElementMode) {
    if(this._mode !== mode) {
      this._mode = mode;
      this.modeChange.emit(mode);
    }
  }

  get mode() {
    return this._mode;
  }

  @Output()
  modeChange = new EventEmitter<CronElementMode>();

  CronElementMode = CronElementMode;

  constructor() {
  }

  ngOnInit(): void {
  }

}
