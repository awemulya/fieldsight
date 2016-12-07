import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero }                from '../../hero';
import { FieldsightXF } from '../../models/fieldsightxf';
import myGlobals = require('../../globals');

@Injectable()
export class GroupsService {
  private koboURL = myGlobals.KOBOCAT_URL 
  private groupsURL = this.koboURL + '/forms/api/groups';  // URL to groups api
  private apiSiteForms = this.koboURL + '/forms/api/site';  // URL to groups api
  private heroesUrl = this.koboURL + '/fieldsight/api/site';  // URL to sites
  constructor(private http: Http) { }

  getGroups() {
    return this.http.get(this.groupsURL)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  }

  getForms(id: number): Promise<FieldsightXF[]> {
    return this.http.get(this.apiSiteForms+"/"+id)
               .toPromise()
               .then(response => response.json() as FieldsightXF[])
               .catch(this.handleError);
  }

  getReloadedForms(id: number): Promise<FieldsightXF[]> {
    return this.http.get(this.apiSiteForms+"/"+id)
               .toPromise()
               .then(response => response.json() as FieldsightXF[])
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