import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SensorValues } from 'src/app/models/sensorvalues ';

@Component({
  selector: 'app-sensorvalues',
  templateUrl: './sensorvalues.component.html',
  styleUrls: ['./sensorvalues.component.scss']
})
export class SensorvaluesComponent implements OnInit {

  @Input() sensorValues: SensorValues | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  _average : SensorValues | undefined;
  _minimum : SensorValues | undefined;
  _maximum : SensorValues | undefined;

  ngOnChanges(changes: SimpleChanges) {
    
    console.log("ngOnChanges");
    console.log(changes);

    if (changes.sensorValues && changes.sensorValues.currentValue) {
      let theChange = changes.sensorValues.currentValue;
      this.updateSummaryValues(theChange);
    }
  }

  private updateSummaryValues(currentSensorValues: SensorValues) {
    console.log("updateSummaryValues");
    console.log(currentSensorValues);

    // Average
    if (this._average == undefined) {
      // console.log("average undefined");
      this._average = { ...currentSensorValues};
    } else {
      // console.log("average");
      // console.log(this._average );
      this._average.altitude = ( this._average.altitude + currentSensorValues.altitude ) / 2;
      this._average.latitude = ( this._average.latitude + currentSensorValues.latitude ) / 2;
      this._average.longitude = ( this._average.longitude + currentSensorValues.longitude ) / 2;
      // console.log("_average.accelerationX: " + this._average.accelerationX );
      this._average.accelerationX = ( this._average.accelerationX + currentSensorValues.accelerationX ) / 2;
      this._average.accelerationY = ( this._average.accelerationY + currentSensorValues.accelerationY ) / 2;
      this._average.accelerationZ = ( this._average.accelerationZ + currentSensorValues.accelerationZ ) / 2;

      this._average.magnitudeX = ( this._average.magnitudeX + currentSensorValues.magnitudeX ) / 2;
      this._average.magnitudeY = ( this._average.magnitudeY + currentSensorValues.magnitudeY ) / 2;
      this._average.magnitudeZ = ( this._average.magnitudeZ + currentSensorValues.magnitudeZ ) / 2;

      this._average.heartRate = ( this._average.heartRate + currentSensorValues.heartRate ) / 2;
      this._average.cadence = ( this._average.cadence + currentSensorValues.cadence ) / 2;
      this._average.power = ( this._average.power + currentSensorValues.power ) / 2;
      this._average.heading = ( this._average.heading + currentSensorValues.heading ) / 2;
      this._average.speed = ( this._average.speed + currentSensorValues.speed ) / 2;
      this._average.temperature = ( this._average.temperature + currentSensorValues.temperature ) / 2;
      this._average.pressure = ( this._average.pressure + currentSensorValues.pressure ) / 2;
    }

    if (this._minimum == undefined) {
      console.log("minimum undefined");
      this._minimum = { ...currentSensorValues};
    } else {
      this._minimum.altitude = this._minimum.altitude < currentSensorValues.altitude ?  this._minimum.altitude : currentSensorValues.altitude;
      this._minimum.latitude = this._minimum.latitude < currentSensorValues.latitude ? this._minimum.latitude : currentSensorValues.latitude;
      this._minimum.longitude = this._minimum.longitude < currentSensorValues.longitude ? this._minimum.longitude : currentSensorValues.longitude;

      this._minimum.accelerationX = ( this._minimum.accelerationX < currentSensorValues.accelerationX ? this._minimum.accelerationX : currentSensorValues.accelerationX);
      this._minimum.accelerationY = this._minimum.accelerationY < currentSensorValues.accelerationY ? this._minimum.accelerationY : currentSensorValues.accelerationY;
      this._minimum.accelerationZ = this._minimum.accelerationZ < currentSensorValues.accelerationZ ? this._minimum.accelerationZ : currentSensorValues.accelerationZ;

      this._minimum.magnitudeX = this._minimum.magnitudeX < currentSensorValues.magnitudeX ? this._minimum.magnitudeX : currentSensorValues.magnitudeX;
      this._minimum.magnitudeY = this._minimum.magnitudeY < currentSensorValues.magnitudeY ? this._minimum.magnitudeY : currentSensorValues.magnitudeY;
      this._minimum.magnitudeZ = this._minimum.magnitudeZ < currentSensorValues.magnitudeZ ? this._minimum.magnitudeZ : currentSensorValues.magnitudeZ;

      this._minimum.heartRate = this._minimum.heartRate < currentSensorValues.heartRate ? this._minimum.heartRate : currentSensorValues.heartRate;
      this._minimum.cadence = this._minimum.cadence < currentSensorValues.cadence ? this._minimum.cadence : currentSensorValues.cadence;
      this._minimum.power = this._minimum.power < currentSensorValues.power ? this._minimum.power : currentSensorValues.power;
      this._minimum.heading = this._minimum.heading < currentSensorValues.heading ? this._minimum.heading : currentSensorValues.heading;
      this._minimum.speed = this._minimum.speed < currentSensorValues.speed ? this._minimum.speed : currentSensorValues.speed;
      this._minimum.temperature = this._minimum.temperature < currentSensorValues.temperature ? this._minimum.temperature : currentSensorValues.temperature;
      this._minimum.pressure = this._minimum.pressure < currentSensorValues.pressure ? this._minimum.pressure : currentSensorValues.pressure;
    }

    if (this._maximum == undefined) {
      this._maximum = {...currentSensorValues};
    } else {
      this._maximum.altitude = this._maximum.altitude > currentSensorValues.altitude ?  this._maximum.altitude : currentSensorValues.altitude;
      this._maximum.latitude = this._maximum.latitude > currentSensorValues.latitude ? this._maximum.latitude : currentSensorValues.latitude;
      this._maximum.longitude = this._maximum.longitude > currentSensorValues.longitude ? this._maximum.longitude : currentSensorValues.longitude;

      this._maximum.accelerationX = ( this._maximum.accelerationX > currentSensorValues.accelerationX ? this._maximum.accelerationX : currentSensorValues.accelerationX);
      this._maximum.accelerationY = this._maximum.accelerationY > currentSensorValues.accelerationY ? this._maximum.accelerationY : currentSensorValues.accelerationY;
      this._maximum.accelerationZ = this._maximum.accelerationZ > currentSensorValues.accelerationZ ? this._maximum.accelerationZ : currentSensorValues.accelerationZ;

      this._maximum.magnitudeX = this._maximum.magnitudeX > currentSensorValues.magnitudeX ? this._maximum.magnitudeX : currentSensorValues.magnitudeX;
      this._maximum.magnitudeY = this._maximum.magnitudeY > currentSensorValues.magnitudeY ? this._maximum.magnitudeY : currentSensorValues.magnitudeY;
      this._maximum.magnitudeZ = this._maximum.magnitudeZ > currentSensorValues.magnitudeZ ? this._maximum.magnitudeZ : currentSensorValues.magnitudeZ;

      this._maximum.heartRate = this._maximum.heartRate > currentSensorValues.heartRate ? this._maximum.heartRate : currentSensorValues.heartRate;
      this._maximum.cadence = this._maximum.cadence > currentSensorValues.cadence ? this._maximum.cadence : currentSensorValues.cadence;
      this._maximum.power = this._maximum.power > currentSensorValues.power ? this._maximum.power : currentSensorValues.power;
      this._maximum.heading = this._maximum.heading > currentSensorValues.heading ? this._maximum.heading : currentSensorValues.heading;
      this._maximum.speed = this._maximum.speed > currentSensorValues.speed ? this._maximum.speed : currentSensorValues.speed;
      this._maximum.temperature = this._maximum.temperature > currentSensorValues.temperature ? this._maximum.temperature : currentSensorValues.temperature;
      this._maximum.pressure = this._maximum.pressure > currentSensorValues.pressure ? this._maximum.pressure : currentSensorValues.pressure;
     
    }
  }
  
}
