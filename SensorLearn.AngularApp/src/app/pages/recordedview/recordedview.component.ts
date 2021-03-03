import { Component, OnInit } from '@angular/core';
import { FilterValues } from 'src/app/models/filtervalues';
import { SensorValues } from 'src/app/models/sensorvalues ';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recordedview',
  templateUrl: './recordedview.component.html',
  styleUrls: ['./recordedview.component.scss']
})
export class RecordedviewComponent implements OnInit {

  sensorDataArray: SensorValues[] | undefined;
  filter: FilterValues | undefined;

  constructor(private dataService: DataService) {
    this.getFilter();
    this.getSensorData();
  }

  getFilter() : void {
    this.dataService.getFilter().subscribe(data => {
      this.filter = data;
    })
  }

  getSensorData(): void {
    this.dataService.getSensorValues().subscribe(data => {
      this.sensorDataArray = data;
    });
  }

  ngOnInit(): void {
  }

  onFilterUpdate(event: any) {
    console.log("onFilterUpdate: ");
    console.log(event);
    
    // Clear old data
    this.sensorDataArray = undefined;

    this.dataService.setFilter(event);
    this.getSensorData();
  }

}
