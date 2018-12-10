import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  public calculateTimeDiff(startingTime: Date, endTime): number {
    const begin: number = startingTime.getTime();
    const end: number = endTime.getTime();
    const diffrence: number = end - begin;

    return diffrence;
  }

  public calculateTimeDiffAndGiveString(startingTime: Date, endTime): string {
    const diffrence: number = this.calculateTimeDiff(startingTime, endTime);

    const result = this.convertMilisecsToString(diffrence); 
    return result;
  }

  private convertMilisecsToString(ms: number): string {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    const result: string = days + "d " + hours + "h " + minutes + "m " + seconds + "s "; 
    return result;
  }
}
