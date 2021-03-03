import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterValues } from 'src/app/models/filtervalues';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sensorvaluesfilter',
  templateUrl: './sensorvaluesfilter.component.html',
  styleUrls: ['./sensorvaluesfilter.component.scss']
})
export class SensorvaluesfilterComponent implements OnInit {

  constructor(private dataService: DataService) { }

  @Input() filter: FilterValues | undefined;
  ngOnInit(): void {
  }

  @Output()
  filterUpdate: EventEmitter<FilterValues> = new EventEmitter<FilterValues>();

  onFilterUpdate() {
    console.log("onFilterUpdateClicked: " + this.filter?.minDateTime + " - " + this.filter?.maxDateTime);
    this.filterUpdate.emit(this.filter);
    // this.dataService.setFilter(this.filter);
  }
  
  changeMinDate(event: any) {
    if (this.filter) {
      this.filter.minDateTime = event.target.value;
    }
  }

  changeMaxDate(event: any) {
    if (this.filter) {
      this.filter.maxDateTime = event.target.value;
    }
  }

}
