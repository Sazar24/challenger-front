import { Device } from '../models/device.model';
import { Component, OnInit } from '@angular/core';
import { DevicesStoreService } from '../services/devices-store.service';

@Component({
  selector: 'devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  public devices: Device[];

  constructor(
    private devicesStore: DevicesStoreService,
    // TODO: tutaj socketService (a ten łączy się z DevicesStoreService)
  ) {
  }

  ngOnInit() {
    this.devices = this.devicesStore.devices;
  }
} 