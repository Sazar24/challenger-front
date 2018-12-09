import { timestampEventData } from './timestamp.model';
import { Observable } from 'rxjs';

export class device {
    name: string;
    toggledOn: boolean;
    webSocketUrl?: string;
    fakeSocketObservable: Observable<timestampEventData>;
    constructor(name: string, toggledOn: boolean, timePeriod: number) {
        this.name = name;
        this.toggledOn = toggledOn;
        this.fakeSocketObservable = new Observable((observer) => {
            this.fakeSocketTimeoutActions(observer, timePeriod);
        });
        console.log(`${this.name}: created!`)
    }


    private fakeSocketTimeoutActions(observer, timePeriod: number): void {
        const interval = setInterval(() => { 
            const result = new timestampEventData(this.toggledOn, new Date());
            observer.next(result);

            this.toggledOn = !this.toggledOn;
        }, timePeriod);

        setTimeout(() => {
            clearInterval(interval);
        }, timePeriod * 5);
    }
}

