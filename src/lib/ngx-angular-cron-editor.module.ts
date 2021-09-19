import {NgModule} from '@angular/core';
import {CronEditorComponent} from "./cron-editor/cron-editor.component";
import {CronDescriptionComponent} from "./cron-description/cron-description.component";
import {CronElementModeSelectorComponent} from "./internal/presentation/cron-element-mode-selector/cron-element-mode-selector.component";
import {MultiSelectComponent} from "./internal/presentation/multi-select/multi-select.component";
import {CronElementLabelsComponent} from "./internal/presentation/cron-element-labels/cron-element-labels.component";
import {DayOfWeekMultiSelectComponent} from "./internal/presentation/day-of-week-multi-select/day-of-week-multi-select.component";
import {CronNextTimeComponent} from "./cron-next-time/cron-next-time.component";
import {BrowserModule} from '@angular/platform-browser';
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    CronEditorComponent,
    CronDescriptionComponent,
    CronElementModeSelectorComponent,
    MultiSelectComponent,
    CronElementLabelsComponent,
    DayOfWeekMultiSelectComponent,
    CronNextTimeComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  exports: [
    CronEditorComponent,
    CronDescriptionComponent,
    CronNextTimeComponent,
  ]
})
export class NgxAngularCronEditorModule {
}
