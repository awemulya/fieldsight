import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User, Token } from '../../models/fieldsightxf';
import myGlobals = require('../../globals');


@Injectable()
export class UserService {
  private koboURL = myGlobals.KOBOCAT_URL;
  private userInfoURL = this.koboURL + '/users/me';  
  private userToken = "";
  private loginURL = this.koboURL + '/users/api/get-auth-token/';  
  private headers = new Headers({ 'Content-Type': 'application/json'}); 
  private options = new RequestOptions({ headers: this.headers })
  // this.headers.append("Authorization", 'Token ' + localStorage.getItem('id_token'))
  constructor(private http: Http) { }

  setToken(userToken: string) {
        this.userToken = userToken;
    }

    getToken() {
        return this.userToken;
    }

    checkUser(obj: User): Promise<any> {
    return this.http.post(this.loginURL, JSON.stringify(obj), this.options)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }
  
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}