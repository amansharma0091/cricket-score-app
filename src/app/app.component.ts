import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LiveMatchService } from './livematch.service';
import { Match } from './match';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.css', '../../node_modules/bulma/css/bulma.css']
})
export class AppComponent implements OnInit {
    value: Date;
    matches: Match[] = [];
    selectedMatch: Match;

    public constructor(private liveMatchService: LiveMatchService) {
        this.value = new Date(liveMatchService.defaultMatchDate);
    }
    public ngOnInit(): void {
        this.updateMatchList();
    }
    private formatDate(date: Date): string {
        const dateString = + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return dateString;
    }
    public onMatchSelect(match: Match) {
        this.selectedMatch = match;
        this.liveMatchService.setMatchId(this.selectedMatch.id);
    }
    public updateMatchList(): void {
        this.liveMatchService.getMatches(this.formatDate(this.value)).subscribe(
            matches => { this.matches = matches; this.selectedMatch = this.matches[0]; });
    }

}
