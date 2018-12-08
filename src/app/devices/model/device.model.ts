import { Observable } from 'rxjs';

export class device {
    name: string;
    toggledOn: boolean;
    webSocketUrl?: string;
    fakeSocketObservable: Observable<boolean>;
    constructor(name: string, toggledOn: boolean, timePeriod: number) {
        this.name = name;
        this.toggledOn = toggledOn;
        this.fakeSocketObservable = new Observable((observer) => {
            setInterval(() => {
                observer.next(this.toggledOn);
                this.toggledOn = !this.toggledOn;
            }, timePeriod);
        });
        console.log(`${this.name}: created!`)
    }

}