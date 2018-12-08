import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { DevicePanelComponent } from './devices/device-panel/device-panel.component';
import { DevicesListComponent } from './devices/devices-list/devices-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidePanelComponent,
    DevicePanelComponent,
    DevicesListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
