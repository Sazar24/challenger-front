import { device } from './../model/device.model';
import { Component, OnInit } from '@angular/core';
import { DevicesManagerService } from '../services/devices-manager.service';

@Component({
  selector: 'devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  public devices : device[];

  constructor(private devicesManagerService: DevicesManagerService) {
  }

  ngOnInit() {
    this.devices = this.devicesManagerService.devices;
  }
} 