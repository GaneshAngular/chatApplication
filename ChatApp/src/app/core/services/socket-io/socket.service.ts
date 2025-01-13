import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:Socket=io("http://localhost:8080",{
    reconnection: true,         // Enable reconnection
    reconnectionAttempts: 5,    // Number of attempts to reconnect before failing
    reconnectionDelay: 1000,    // Time in ms between reconnection attempts
    reconnectionDelayMax: 5000, // Max delay in ms before reconnecting
    timeout: 10000,             // Timeout in ms before considering the connection failed
  });
  constructor() { }

  emit(emitName:string,data:any){
     this.socket.emit(emitName,data);
  }
  on(eventName:string,callback:(data:any)=>void){
       this.socket.on(eventName,callback);
  }

  disconnect(){
    this.socket.disconnect();
  }

}
