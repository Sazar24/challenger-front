export class timestampEventData {
    state: boolean;
    timestamp: Date;
    // timestamp: string;

    constructor(state: boolean, time: Date) {
        // constructor(state: boolean, time: string) {
        this.state = state;
        this.timestamp = time;
    }

    
}