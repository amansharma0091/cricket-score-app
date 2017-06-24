import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LiveMatchComponent } from './livematch-component';
import { ScoreBoardComponent } from './scoreboard.component';

import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarModule} from 'primeng/primeng';
import { LiveMatchService } from './livematch.service';
@NgModule({
  declarations: [
    AppComponent, ScoreBoardComponent, LiveMatchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DatepickerModule.forRoot(),
    CalendarModule
  ],
  providers: [ LiveMatchService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
