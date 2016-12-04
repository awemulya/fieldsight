import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Hero }           from './hero';
import myGlobals = require('./globals');
@Injectable()
export class HeroSearchService {
private heroesUrl = myGlobals.KOBOCAT_URL+"/fieldsight/api/site";

  constructor(private http: Http) {}
  search(term: string): Observable<Hero[]> {
    return this.http
               .get(this.heroesUrl + "/?name=${term}")
               .map((r: Response) => r.json().data as Hero[]);
  }
}
