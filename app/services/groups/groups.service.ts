import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupsService {
  private apiURL = 'http://192.168.1.17:8001/fieldsight/api/site';  // URL to web api

  constructor(private http: Http) { }

  getDinos() {
    return this.http.get(this.apiURL)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}