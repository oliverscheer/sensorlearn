import { Component, Input, OnInit } from '@angular/core';
import { SensorValues } from 'src/app/models/sensorvalues ';

@Component({
  selector: 'app-sensorvaluestable',
  templateUrl: './sensorvaluestable.component.html',
  styleUrls: ['./sensorvaluestable.component.scss']
})
export class SensorvaluestableComponent implements OnInit {

  @Input() sensorValuesArray: SensorValues[] | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
