import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Stage, Schedule, Day } from '../../models/fieldsightxf';
import myGlobals = require('../../globals');

@Injectable()
export class ScheduleService {
  private koboURL = myGlobals.KOBOCAT_URL
  private scheduleapiURL = this.koboURL + '/forms/api/schedule';  // URL to groups api
  private dayapiURL = this.koboURL + '/forms/api/day';  // URL to groups api
  constructor(private http: Http) { }

  
  getDays(): Promise<Day[]> {
    return this.http.get(this.dayapiURL)
               .toPromise()
               .then(response => response.json() as Day[])
               .catch(this.handleError);
  }

  getSchedules(): Promise<Schedule[]> {
    return this.http.get(this.scheduleapiURL)
               .toPromise()
               .then(response => response.json() as Schedule[])
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}