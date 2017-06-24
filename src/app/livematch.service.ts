import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Delivery } from './delivery';
import { Over } from './livematch-component';
import { Match } from './match';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LiveMatchService {

  private options: RequestOptions;
  public matchId: BehaviorSubject<number> = new BehaviorSubject<number>(529);
  public defaultMatchDate : string = "2016-04-18";

  constructor(private http: Http)  {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }
  public setMatchId(matchId: number) {
    this.matchId.next(matchId);
  }
  public getDelivery(over: Over, matchId :number): Observable<Delivery> {
    const url = 'https://capp-ci-api-dev.herokuapp.com/delivery-by-over?match='+matchId+'&inning=2&over=' + over.over + '&ball=' + over.ball;
    return this.http.get(url)
      .map(resp => {
        return resp.json();
      })
      .catch(this.handleError);
  }
  public getMatches(date: string): Observable<Match[]> {
    const url = 'https://capp-ci-api-dev.herokuapp.com/matches-on-date?date=' + date;
    return this.http.get(url)
      .map(resp => {
        return resp.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In production use logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
