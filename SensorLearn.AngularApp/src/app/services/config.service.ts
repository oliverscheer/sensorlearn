import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  constructor() { }

  getBaseRestAPIUrl() : string {
    return "https://localhost:44373/";
  }

  getAllSensorValuesUrl() : string {
    return this.getBaseRestAPIUrl() + "GetAllSensorData";
  }

  getFilteredSensorValuesUrl(): string {
    return this.getBaseRestAPIUrl() + "GetFilteredSensorData";
  }

  getFilterValuesUrl() : string {
    return this.getBaseRestAPIUrl() + "GetFilter";
  }

  getSensorHubUrl(): string {
    // return this.getBaseRestAPIUrl() + "fakesensorhub";
    return this.getBaseRestAPIUrl() + "sensorhub";
  }

}
