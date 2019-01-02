import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from "rxjs";

// const SERVER_URL :string = "";
// const SERVER_URL: string = 'http://localhost:8080';
const SERVER_URL: string = 'https://monkey-challenge-server.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
    console.log("socket initiated")
  }

  public onMessage(): Observable<string> {
    return new Observable<string>(observer => {
      // this.socket.on('message', (data: string) => observer.next(data));
      this.socket.on('monkey-update',
        (data: any) => {
          observer.next(data)
          console.log('monkey-update: ' + data);
        });
    });
  }
}


// socket.on('monkey-update', monkeyUpdate =>
// {
//    console.log('monkey-update', monkeyUpdate);
// });