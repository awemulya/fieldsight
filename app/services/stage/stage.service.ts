import { Injectable }    from '@angular/core';
import { Headers, Http , RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Stage} from '../../models/fieldsightxf';
import myGlobals = require('../../globals');

@Injectable()
export class StageService {
  private koboURL = myGlobals.KOBOCAT_URL
  private apiURL = this.koboURL + '/forms/api/stage/';  // URL to groups api
  private apiURLMainStages = this.koboURL + '/forms/api/main-stages/';  // URL to groups api
  private siteMainStagesUrl = this.koboURL + '/forms/api/site-main-stages';  // URL to groups api
  private headers = new Headers({ 'Content-Type': 'application/json' });
  // this.headers.append("Authorization", 'Bearer ' + localStorage.getItem('id_token'))
  private options = new RequestOptions({ headers: this.headers });// user token 
  constructor(private http: Http) { }

  
  getStages(): Promise<Stage[]> {
    return this.http.get(this.apiURL)
               .toPromise()
               .then(response => response.json() as Stage[])
               .catch(this.handleError);
  }

  getMainStages(): Promise<Stage[]> {
    return this.http.get(this.apiURLMainStages)
               .toPromise()
               .then(response => response.json() as Stage[])
               .catch(this.handleError);
  }

   getSiteMainStages(site_id: number): Promise<Stage[]> {
    return this.http.get(this.siteMainStagesUrl+"/"+site_id)
               .toPromise()
               .then(response => response.json() as Stage[])
               .catch(this.handleError);
  }


   saveStage(obj:Stage): Promise<Stage>{
    return this.http.post(this.apiURL, JSON.stringify(obj),this.options)
      .toPromise()
               .then(response => response.json() as Stage)
               .catch(this.handleError);
               

  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}