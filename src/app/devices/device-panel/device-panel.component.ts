import { TimestampsManagingService } from './../services/timestamps-manager.service';
import { hangingPeriod } from './../models/hangPeriod.model';
import { timestampEventData } from './../models/timestamp.model';
import { Device } from '../models/device.model';
import { DevicesStoreService } from '../services/devices-store.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'device-panel',
  templateUrl: './device-panel.component.html',
  styleUrls: ['./device-panel.component.css']
})
export class DevicePanelComponent implements OnInit {

  @Input() deviceIndex: number;
  private device: Device;
  // private timerRunning;
  private stateChanges$: Subscription;
  private storedHangingPeriods: hangingPeriod[] = [];
  private changesCounter: number = 0;
  public startingTimeForActiveTimer: Date;
  private ioConnection: any;

  constructor(
    private devicesStore: DevicesStoreService,
    private timestampsManagingService: TimestampsManagingService,
    private socketService: SocketService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    // this.device = this.devicesStore.devices[this.deviceIndex];
    this.device = this.devicesStore.getDeviceByIndex(this.deviceIndex);
    this.subscribeToStateChanges();



    /*    this.pingMonkeys();
       this.socketService.initSocket();
       this.ioConnection = this.socketService.onMessage()
         .subscribe(
           (message: string) => {
             console.log("wiadomość received: " + JSON.stringify(message));
           }); */


    // this.storedHangingPeriods.push(new hangingPeriod());  // TODO: refactor (this is temp solution)
  }

  /*   pingMonkeys() {
      const monkeyServerURL = "https://monkey-challenge-server.herokuapp.com/ping";
      this.http.get(monkeyServerURL).subscribe(
        (data) => {
          console.log("ping response: " + data);
        },
        (error)=>console.log("error" + error)
      ) 
    } */

  private subscribeToStateChanges(): void {
    this.stateChanges$ = this.device.webSocket.subscribe((newEventPackage: timestampEventData) => {
      this.device.isOnStatus = newEventPackage.state;
      this.changesCounter++;
      this.saveTimestampToStore(newEventPackage);

      if (newEventPackage.state === true) {
        this.startingTimeForActiveTimer = newEventPackage.timestamp;
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
