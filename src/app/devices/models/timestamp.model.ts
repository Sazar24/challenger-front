export class timestampEventData {
    state: boolean;
    timestamp: Date;

    constructor(state: boolean, time: Date) {
        this.state = state;
        this.timestamp = time;
    }

    
}