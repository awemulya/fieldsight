import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero }                from '../../hero';

@Injectable()
export class GroupsService {
  private apiURL = 'http://192.168.1.10:8001/forms/api/groups';  // URL to groups api
  private apiSiteForms = 'http://192.168.1.17:8001/forms/api/site';  // URL to groups api
  private heroesUrl = 'http://192.168.1.17:8001/fieldsight/api/site';  // URL to sites
  constructor(private http: Http) { }

  getGroups() {
    return this.http.get(this.apiURL)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  }

  getForms(id: number): Promise<Hero[]> {
    return this.http.get(this.apiSiteForms+"/"+id)
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError);
  }
  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }
}