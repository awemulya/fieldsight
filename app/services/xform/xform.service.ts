import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Xform, FieldsightXF } from '../../models/fieldsightxf';
import myGlobals = require('../../globals');

@Injectable()
export class XformService {
  private koboURL = myGlobals.KOBOCAT_URL;
  private apiURL = this.koboURL + '/forms/api/xform';  
  private assignURL = this.koboURL + '/forms/api/fsxform/';  // URL to save fsxf
  private headers = new Headers({ 'Content-Type': 'application/json' });
  // this.headers.append("Authorization", 'Bearer ' + localStorage.getItem('id_token'))
  private options = new RequestOptions({ headers: this.headers });// user token 
  constructor(private http: Http) { }

  
  getForms(): Promise<Xform[]> {
    return this.http.get(this.apiURL)
               .toPromise()
               .then(response => response.json() as Xform[])
               .catch(this.handleError);
  }

  saveAssignedForm(obj:FieldsightXF): Promise<FieldsightXF[]>{
    return this.http.post(this.assignURL, JSON.stringify(obj),this.options)
      .toPromise()
               .then(response => response.json() as FieldsightXF[])
               .catch(this.handleError);
               

  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}