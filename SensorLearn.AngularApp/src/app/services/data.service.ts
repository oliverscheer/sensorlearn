import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { FilterValues } from '../models/filtervalues';
import { SensorValues } from '../models/sensorvalues ';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private filter: FilterValues | undefined = undefined;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {

  }

  setFilter(filter: FilterValues  | undefined) {
    console.log("setFilter");
    console.log(filter)
    this.filter = filter;
    // this.getSensorValues();
  }

  getFilter(): Observable<FilterValues> {
    return this
      .httpClient
      .get<FilterValues>(this.configService.getFilterValuesUrl())
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getSensorValues(): Observable<SensorValues[]> {
    console.log("getSensorValues");
    let url = this.configService.getFilteredSensorValuesUrl();
    
    let httpParams = new HttpParams();
    if (this.filter != undefined) {
      console.log("filter added: " + this.filter.minDateTime + " - " +this.filter.maxDateTime )
      httpParams = httpParams.append("minDateTime", this.filter.minDateTime);
      httpParams = httpParams.append("maxDateTime", this.filter.maxDateTime);
    }
      
    return this
      .httpClient
      .get<SensorValues[]>(url,{
        params: httpParams
      })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
