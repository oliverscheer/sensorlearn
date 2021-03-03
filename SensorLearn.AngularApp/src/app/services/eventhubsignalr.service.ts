import { Injectable, EventEmitter } from '@angular/core';
import { SensorValues } from '../models/sensorvalues ';
import * as signalR from "@microsoft/signalr";
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EventhubsignalrService {

  // @Output()
  public sensorValuesReceived: EventEmitter<SensorValues> = new EventEmitter<SensorValues>();

  private hubConnection: signalR.HubConnection;

  constructor(private configService: ConfigService) {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(configService.getSensorHubUrl())
      .build();

    this.hubConnection.start()
      .then(() => console.log("Connection started"))
      .catch(err => console.log("Error while starting connection: " + err));

    this.hubConnection.on("ReceiveData", (data: SensorValues) => {
      // this.watchdata = data;
      this.sensorValuesReceived.emit(data);

    });
  }

}
