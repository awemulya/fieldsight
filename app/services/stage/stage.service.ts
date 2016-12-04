import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Stage, Schedule } from '../../models/fieldsightxf';
import myGlobals = require('../../globals');

@Injectable()
export class StageService {
  private koboURL = myGlobals.KOBOCAT_URL
  private apiURL = this.koboURL + '/forms/api/stage';  // URL to groups api
  private scheduleapiURL = this.koboURL + '/forms/api/schedule';  // URL to groups api
  constructor(private http: Http) { }

  
  getStages(): Promise<Stage[]> {
    return this.http.get(this.apiURL)
               .toPromise()
               .then(response => response.json() as Stage[])
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