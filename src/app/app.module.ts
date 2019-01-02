import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { DevicePanelComponent } from './devices/device-panel/device-panel.component';
import { DevicesListComponent } from './devices/devices-list/devices-list.component';
import { TimeCounterDisplayerComponent } from './devices/device-panel/time-counter-displayer/time-counter-displayer.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidePanelComponent,
    DevicePanelComponent,
    DevicesListComponent,
    TimeCounterDisplayerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
