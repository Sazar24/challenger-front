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
            this.toggledOn = !this.toggledOn;
            // const result = new timestampEventData(this.toggledOn, new Date());
            const result = new timestampEventData(this.toggledOn, this.dateToString());
            console.log(`sending: ${JSON.stringify(result)}`);
            observer.next(result); 
        }, timePeriod);

        setTimeout(() => {
            clearInterval(interval);
        }, timePeriod * 8);
    }

    private dateToString(): string {
        const now: Date = new Date();
        let result: string;

        result = `
        ${now.getHours() < 10 ? "0" + now.getHours() : now.getHours()}
        :${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}
        :${now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()}
        `; 
        return result;
    }
}

