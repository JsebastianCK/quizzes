import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private url: string = 'http://192.168.1.62:5000';
  private socket: any;


  constructor() {
    this.socket = io(this.url);
  }

  send(eventName , data=null) {
    this.socket.emit(eventName , data)
  }

  listen(evento: String){
    return Observable.create((subscriber) => {
        this.socket.on(evento , (data) => {
          subscriber.next(data);
        })
    })
  }
}
