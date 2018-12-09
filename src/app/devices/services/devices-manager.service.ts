import { Injectable } from '@angular/core';
import { device } from '../models/device.model';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesManagerService {

  public devices: device[] = [
    new device("foo", false, 500),
    new device("bar", true, 1000),
    new device("lorem", true, 1500),
    new device("ipsum", true, 2500),
  ];

  constructor() { }

  // public getDevice(index: number): device{

  // };

}
