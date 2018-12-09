import { hangingPeriod } from './../models/hangPeriod.model';
import { timestampEventData } from './../models/timestamp.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimestampsManagingService {

  constructor() { }
  
  checkIntegrity():boolean{

    return;
  }
  public addTimeStamp(newTimestamp: timestampEventData, storedPeriods: hangingPeriod[]): void {

    const storedPeriodsLastItemIndex: number = storedPeriods.length - 1;
    if (storedPeriodsLastItemIndex < 0) {
      this.addStartTimestamp(newTimestamp, storedPeriods);
      return;
    }

    const lastItem: hangingPeriod = storedPeriods[storedPeriodsLastItemIndex];
    if (lastItem === undefined) throw new Error(`lastItem -in storedPeriods- is undefined! It suppose to be handled alredy!\nindex is == ${storedPeriodsLastItemIndex}`);

    if (lastItem.start === undefined) {
      this.addStartTimestamp(newTimestamp, storedPeriods);
      return;
    }
    else {
      if (lastItem.stop === undefined) {
        this.addStopTimestamp(newTimestamp, storedPeriods);
        return;
      }
      else {
        if (lastItem.start !== undefined && lastItem.stop !== undefined) {
          this.addStartTimestamp(newTimestamp, storedPeriods);
          return;
        }
        else console.warn("unpredicted (and impossible) case");
      }
    }
  }

  // private addInitialTimestamp(newTimestamp: timestampEventData, storedPeriods: hangingPeriod[]): void { }

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