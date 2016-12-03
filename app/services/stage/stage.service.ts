import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Stage, Schedule } from '../../models/fieldsightxf';

@Injectable()
export class StageService {
  private apiURL = 'http://192.168.1.17:8001/forms/api/stage';  // URL to groups api
  private scheduleapiURL = 'http://192.168.1.17:8001/forms/api/schedule';  // URL to groups api
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