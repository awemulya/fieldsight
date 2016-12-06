import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Schedule, Day } from '../../models/fieldsightxf';
import myGlobals = require('../../globals');

@Injectable()
export class ScheduleService {
  private koboURL = myGlobals.KOBOCAT_URL
  private scheduleapiURL = this.koboURL + '/forms/api/schedule/';  // URL to groups api
  private dayapiURL = this.koboURL + '/forms/api/day';  // URL to groups api

  private headers = new Headers({ 'Content-Type': 'application/json' });
  // this.headers.append("Authorization", 'Bearer ' + localStorage.getItem('id_token'))
  private options = new RequestOptions({ headers: this.headers });// user token 

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

  

  saveSchedule(obj:Schedule): Promise<Schedule>{
    return this.http.post(this.scheduleapiURL, JSON.stringify(obj),this.options)
      .toPromise()
               .then(response => response.json() as Schedule)
               .catch(this.handleError);
               

  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}