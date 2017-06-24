import { Component, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LiveMatchService } from './livematch.service';

interface Batsman {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isStriker: boolean;
}
interface Bowler {
  name: string;
  overs: string;
  balls: number;
  maiden: number;
  runs: number;
  wickets: number;
  economy: number;
}
export interface Over {
  over: number;
  ball: number;
}
@Component({
  selector: 'live-match',
  templateUrl: './livematch-component.html',
  styleUrls: ['./livematch-component.css']
})
export class LiveMatchComponent {
  batsman: Batsman;
  nonStriker: Batsman;
  bowler: Bowler;
  bowlers: Bowler[] = [];
  oversInning1: Over = { over: 1, ball: 1 };
  oversInning2: Over;
  crr: number;
  scoreInnings1: number = 0;
  scoreInnings2: number;
  counter: number = 0;
  wicketsInning1: number = 0;
  wicketsInning2: number;
  matchId: number;
  battingTeam: string;
  bowlingTeam: string;

  constructor(private liveMatchService: LiveMatchService) {
    liveMatchService.matchId.subscribe(id => {

      this.matchId = id;
      this.batsman = { name: null, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isStriker: false };
      this.nonStriker = { name: null, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isStriker: false };
      this.bowler = { name: null, overs: '0', maiden: 0, runs: 0, wickets: 0, economy: 0, balls: 0 };

      this.setData();

    });





  }
  private setData(): void {
    Observable.interval(1000).flatMap(() => {

      return this.liveMatchService.getDelivery({ over: Math.floor(this.counter / 6) + 1, ball: (this.counter % 6) + 1 }, this.matchId);
    }).subscribe(delivery => {

      this.battingTeam = delivery.battingTeam;
      this.bowlingTeam = delivery.bowlingTeam;
      
      this.counter = this.counter + 1;
      if (this.counter == 1) {
        this.batsman.name = delivery.batsman;
        this.nonStriker.name = delivery.nonStriker;
        this.bowler.name = delivery.bowler;
      }

      if (this.batsman.name != delivery.batsman && this.batsman.name != delivery.nonStriker) {
        if (this.nonStriker.name != delivery.batsman) {
          this.batsman = { name: delivery.batsman, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isStriker: true };
        }
        if (this.nonStriker.name != delivery.nonStriker) {
          this.batsman = { name: delivery.nonStriker, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isStriker: false };
        }
      }

      if (this.batsman.name === delivery.batsman) {
        this.batsman.runs += delivery.batsmanRuns;
        this.batsman.balls++;
        if (delivery.batsmanRuns === 4) { this.batsman.fours++; }
        if (delivery.batsmanRuns === 6) { this.batsman.sixes++; }
        this.batsman.isStriker = true; this.nonStriker.isStriker = false;
      } else if (this.nonStriker.name === delivery.batsman) {
        this.nonStriker.runs += delivery.batsmanRuns;
        this.nonStriker.balls++;
        if (delivery.batsmanRuns === 4) { this.nonStriker.fours++; }
        if (delivery.batsmanRuns === 6) { this.nonStriker.sixes++; }
        this.nonStriker.isStriker = true;
        this.batsman.isStriker = false;
      }




      const bowler_r = this.bowlers.filter((obj) =>
      { return obj.name === delivery.bowler; }
      )[0];

      if (bowler_r) {
        this.bowler = bowler_r;
        this.bowler.balls++;
        this.bowler.overs = (Math.floor(this.bowler.balls / 6) + 1) + "." + ((this.bowler.balls % 6) + 1);
      } else {
        this.bowler.name = delivery.bowler;
        this.bowlers.push(this.bowler);
      }
      this.bowler.runs += delivery.totalRuns;
      this.scoreInnings1 += delivery.totalRuns;
      
      if (delivery.inning === 1) {
        this.oversInning1 = { over: delivery.over, ball: delivery.ball };
      }
      if (delivery.inning === 2) {
        this.oversInning2 = { over: delivery.over, ball: delivery.ball };
      }

      if (delivery.playerDismissed === '1') {
        this.wicketsInning1++;
        this.bowler.wickets++;
      }
      if (this.wicketsInning1 == 10 || (this.oversInning1.over == 19 && this.oversInning1.ball == 6)) {
        //change inning
        this.counter = 1;
      }

    });
  }
}
