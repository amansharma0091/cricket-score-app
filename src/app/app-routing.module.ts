import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LiveMatchComponent } from './livematch-component';
import { ScoreBoardComponent } from './scoreboard.component';

const appRoutes: Routes = [
 {
    path: '',
    component: LiveMatchComponent
  },
  {
    path: 'live-match',
    component: LiveMatchComponent
  },
  {
    path: 'score-board',
    component: ScoreBoardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
