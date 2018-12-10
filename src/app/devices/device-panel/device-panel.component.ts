import { TimestampsManagingService } from './../services/timestamps-manager.service';
import { hangingPeriod } from './../models/hangPeriod.model';
import { timestampEventData } from './../models/timestamp.model';
import { device } from '../models/device.model';
import { DevicesManagerService } from '../services/devices-manager.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'device-panel',
  templateUrl: './device-panel.component.html',
  styleUrls: ['./device-panel.component.css']
})
export class DevicePanelComponent implements OnInit {

  private device: device;
  @Input() deviceIndex: number;
  private timerRunning;
  private stateChanges$: Subscription;
  private storedHangingPeriods: hangingPeriod[] = [];
  private changesCounter: number = 0;
  public startingTimeForActiveTimer: Date;

  constructor(private devicesManagerService: DevicesManagerService, private timestampsManagingService : TimestampsManagingService) { }

  ngOnInit() {
    this.device = this.devicesManagerService.devices[this.deviceIndex];
    this.subscribeToStateChanges();

    // this.storedHangingPeriods.push(new hangingPeriod());  // TODO: refactor (this is temp solution)
  }

  private subscribeToStateChanges(): void {
    this.stateChanges$ = this.device.fakeSocketObservable.subscribe((timestamp: timestampEventData) => {
      this.device.toggledOn = timestamp.state;
      this.changesCounter++;
      this.saveTimestampToStore(timestamp);

      if (timestamp.state === true){
        this.startingTimeForActiveTimer = timestamp.timestamp;
      }
    },
      (error) => console.log("there was error: " + error),
      () => console.log(`receiving data from rxObservable success for ${this.deviceIndex} `)
    );
  }


  private stopListeningForStateChanges(): void {
    this.stateChanges$.unsubscribe(); // doesnt work, not sure why. state came as a reference?
  }

  private saveTimestampToStore(incomingTimestampEventData: timestampEventData): void {

    this.timestampsManagingService.addTimeStamp(incomingTimestampEventData, this.storedHangingPeriods);

    return;
  }

}
