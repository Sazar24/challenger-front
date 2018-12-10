import { device } from './../../models/device.model';
import { Subscription } from 'rxjs';
import { timestampEventData } from './../../models/timestamp.model';
import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../../../services/timer.service';
import { DevicesManagerService } from '../../services/devices-manager.service';

@Component({
  selector: 'time-counter-displayer',
  templateUrl: './time-counter-displayer.component.html',
  styleUrls: ['./time-counter-displayer.component.css']
})
export class TimeCounterDisplayerComponent implements OnInit {

  @Input() deviceIndex: number;
  private timerIsOn: boolean = true;
  // private timer :NodeJS.Timer;
  private timer;
  private timeDiffInSecs: number;
  private timeDiffAsString: string;

  constructor(private timerService: TimerService, private devicesManagerService: DevicesManagerService) { }

  ngOnInit() {
    this.startTimeCounting();
  }

  private startTimeCounting() {
    if (!this.timerIsOn) {
      // clearInterval(this.timer)
      return;
    }

    // this.timer = setInterval(() => {
    setInterval(
      () => this.calculateTimeDiff(this.deviceIndex, this.devicesManagerService.devices),
      100);
  }

  private calculateTimeDiff(deviceIndex: number, devices: device[]) {
    // todo: tutaj tylko czytać, bez subskrybcji - to i tak jest na timeout`cie.
    // const subscription: Subscription = this.devicesManagerService.devices[this.deviceIndex].fakeSocketObservable.subscribe((timestamp: timestampEventData) => {
    const device: device = devices[deviceIndex];
    // const device.
    // const lastItemIndex
    // if (timestamp.state === true)
      // this.timeDiffAsString = this.timerService.calculateTimeDiffAndGiveString(timestamp.timestamp, new Date());
    // });

    // this.timeDiffAsString = this.timerService.calculateTimeDiffAndGiveString(this.startingTimeForActiveTimer, new Date());
    // console.log("calculated timeDiffAsString" + this.timeDiffAsString);
  }

}
