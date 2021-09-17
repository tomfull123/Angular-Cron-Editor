import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CronEditorComponent} from './presentation/cron-editor/cron-editor.component';
import {CronDescriptionComponent} from './presentation/cron-description/cron-description.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import {CronElementModeSelectorComponent} from './presentation/cron-element-mode-selector/cron-element-mode-selector.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MultiSelectComponent } from './presentation/multi-select/multi-select.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import { CronElementLabelsComponent } from './presentation/cron-element-labels/cron-element-labels.component';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { DayOfWeekMultiSelectComponent } from './presentation/day-of-week-multi-select/day-of-week-multi-select.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { CronNextTimeComponent } from './presentation/cron-next-time/cron-next-time.component';

@NgModule({
  declarations: [
    AppComponent,
    CronEditorComponent,
    CronDescriptionComponent,
    CronElementModeSelectorComponent,
    MultiSelectComponent,
    CronElementLabelsComponent,
    DayOfWeekMultiSelectComponent,
    CronNextTimeComponent
  ],
  imports: [
    BrowserModule,
    MatButtonToggleModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
