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
  private timeDiff: number;
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
    setInterval(() => {
      this.calculateTimeDiff()
    }, 100);
  }

  private calculateTimeDiff() {
    const subscription: Subscription = this.devicesManagerService.devices[this.deviceIndex].fakeSocketObservable.subscribe((timestamp: timestampEventData) => {
      if (timestamp.state === true)
        this.timeDiffAsString = this.timerService.calculateTimeDiffAndGiveString(timestamp.timestamp, new Date());
    });

    // this.timeDiffAsString = this.timerService.calculateTimeDiffAndGiveString(this.startingTimeForActiveTimer, new Date());
    // console.log("calculated timeDiffAsString" + this.timeDiffAsString);
  }

}
