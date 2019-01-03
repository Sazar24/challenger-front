import { timestampEventData } from './../models/timestamp.model';
import { Injectable } from '@angular/core';
import { Device } from '../models/device.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesStoreService {

  public devices: Device[] = [
    new Device("foo", false, 4500),
    new Device("bar", true, 6000),
    new Device("lorem", true, 1500),
    new Device("ipsum", true, 2500),
  ];

  constructor() {
    this.mockPeriodicChangeStart(); // TODO: to wynieść do osobnej klasy (tylko mockującej). + wołać tylko gdy jest .env.production==false.
  }

  public getDeviceByIndex(index: number): Device {
    this.checkCalledIndex(index);
    const result = this.devices[index];
    return result;
  }


  private checkCalledIndex(index: number): void {
    if (index >= this.devices.length) throw new Error("There is no device with such (big) index.");
  }


  private mockPeriodicChangeStart(): void {
    this.devices.forEach(
      device => this.setUpTimeoutAsObservable(device)
    )
  }

  private setUpTimeoutAsObservable(device: Device): void {
    device.webSocket = new Observable((observer) => {
      this.startPeriodicChangesForGivenDevice(device, observer)
    })
  }


  private startPeriodicChangesForGivenDevice(device: Device, observer): void {
    setInterval(() => {
      device.isOnStatus = !device.isOnStatus;
      const result = new timestampEventData(device.isOnStatus, new Date());
      observer.next(result);
    },
      device.timePeriod)
  }
}
