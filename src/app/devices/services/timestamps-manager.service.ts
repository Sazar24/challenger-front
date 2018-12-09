import { hangingPeriod } from './../models/hangPeriod.model';
import { timestampEventData } from './../models/timestamp.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimestampsManagingService {

  constructor() { }

  public addTimeStamp(newTimestamp: timestampEventData, storedPeriods: hangingPeriod[]): void {

    const storedPeriodsLastItemIndex: number = storedPeriods.length - 1;
    if (!storedPeriodsLastItemIndex) {
      this.addStartTimestamp(newTimestamp, storedPeriods);
      return;
    }

    const lastItem: hangingPeriod = storedPeriods[storedPeriodsLastItemIndex];

    if (lastItem.start === undefined) {
      this.addStartTimestamp(newTimestamp, storedPeriods);
    }
    else {
      if (lastItem.stop === undefined) {
        this.addStopTimestamp(newTimestamp, storedPeriods);
      }
      else {
        if (lastItem.start !== undefined && lastItem.stop !== undefined) {
          this.addStartTimestamp(newTimestamp, storedPeriods);
        }
        else console.warn("unpredicted (and impossible) case");
      }

      return;
    }
  }


  private addStartTimestamp(newTimestamp: timestampEventData, storedPeriods: hangingPeriod[]): void {
    if (newTimestamp.state === false) return;

    const newHangingPeriod = new hangingPeriod();

    newHangingPeriod.start = {
      state: newTimestamp.state,
      timestamp: newTimestamp.timestamp
    }

    storedPeriods.push(newHangingPeriod);
  }

  private addStopTimestamp(newTimestamp: timestampEventData, storedPeriods: hangingPeriod[]): void {
    if (newTimestamp.state === true) return;

    const storedPeriodsLastItemIndex: number = storedPeriods.length - 1;

    storedPeriods[storedPeriodsLastItemIndex].stop = {
      state: newTimestamp.state,
      timestamp: newTimestamp.timestamp
    }
  }
}