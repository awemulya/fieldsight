import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Xform } from '../../models/fieldsightxf';

@Injectable()
export class XformService {
  private apiURL = 'http://192.168.1.17:8001/forms/api/xform';  // URL to groups api
  constructor(private http: Http) { }

  
  getForms(): Promise<Xform[]> {
    return this.http.get(this.apiURL)
               .toPromise()
               .then(response => response.json() as Xform[])
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}