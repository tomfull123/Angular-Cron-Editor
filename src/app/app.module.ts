import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CronEditorComponent} from './presentation/cron-editor/cron-editor.component';
import {CronDescriptionComponent} from './presentation/cron-description/cron-description.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import {CronElementModeSelectorComponent} from './presentation/cron-element-mode-selector/cron-element-mode-selector.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    CronEditorComponent,
    CronDescriptionComponent,
    CronElementModeSelectorComponent
  ],
  imports: [
    BrowserModule,
    MatButtonToggleModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
