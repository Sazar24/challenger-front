import { device } from './../model/device.model';
import { DevicesManagerService } from '../services/devices-manager.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'device-panel',
  templateUrl: './device-panel.component.html',
  styleUrls: ['./device-panel.component.css']
})
export class DevicePanelComponent implements OnInit {

  private device: device;
  @Input() deviceIndex: number;
  private timerRunning;

  constructor(private devicesManagerService: DevicesManagerService) { }

  ngOnInit() {
    this.device = this.devicesManagerService.devices[this.deviceIndex];
    this.subscribeToState();
  }

  private subscribeToState(): void {
    const subcscription = this.device.fakeSocketObservable.subscribe(
      (state: boolean) => {
        this.device.toggledOn = state;
        console.log(`receiving data (${state}) from rxObservable success for ${this.deviceIndex} `);
      },
      (error) => console.log("there was error: " + error),
      // () => console.log(`receiving data from rxObservable success for ${this.deviceIndex} `)
    )
  }

  public stopTimer() {
    clearInterval(this.timerRunning);
    console.log("stopTimer() has been called");
  }



}
