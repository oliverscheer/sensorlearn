import { Component, OnInit } from '@angular/core';
import { SensorValues } from 'src/app/models/sensorvalues ';
import { EventhubsignalrService } from 'src/app/services/eventhubsignalr.service';

@Component({
  selector: 'app-liveview',
  templateUrl: './liveview.component.html',
  styleUrls: ['./liveview.component.scss']
})
export class LiveviewComponent implements OnInit {

  sensorValues: SensorValues | undefined;

  constructor(private sensorService: EventhubsignalrService) {
    sensorService.sensorValuesReceived.subscribe(sensorValues => {
      this.sensorValues = sensorValues;
    });
   }

  ngOnInit(): void {
  }

}
