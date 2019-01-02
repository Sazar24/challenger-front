import { timestampEventData } from './timestamp.model';
import { Observable } from 'rxjs';

export class Device {
    name: string;
    isOnStatus: boolean;
    webSocket: Observable<timestampEventData>;
    timePeriod: number;

    constructor(name: string, isOnStatus: boolean, timePeriod: number) {
        this.name = name;
        this.isOnStatus = isOnStatus;
        this.timePeriod = timePeriod;
    }
} 