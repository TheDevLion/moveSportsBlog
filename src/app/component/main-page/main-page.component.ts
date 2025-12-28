import { Component, Input } from '@angular/core';
import { emptySportsEvent, sportsEvents } from 'src/app/interfaces/sportsEvents';
import { SportsEventsService } from 'src/app/service/sports-events.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @Input() preview = '';
  
  sportsEvents: sportsEvents[] = [];
  upcomingEvents: sportsEvents[] = [];
  precedingEvents: sportsEvents[] = [];
  
  
  constructor(private sportsEventsService: SportsEventsService){}

  ngOnInit(){
    if (this.preview)
      window.localStorage.setItem('preview', 'true');
    else
      window.localStorage.removeItem('preview');
      
    this.loadSportsEvents();
  }

  async loadSportsEvents(){
    const result = await this.sportsEventsService.getSportsEvents(this.preview ? true : false);
    this.sportsEvents = result;

    const upcmg = this.selectUpcomingEvents(result);
    this.upcomingEvents = upcmg;

    const precd = this.selectPrecedingEvents(result);
    this.precedingEvents = precd;
  }

  selectUpcomingEvents(events: sportsEvents[]) {
    return events.filter((x: sportsEvents) => {      
      for(let d of x.date){
        if (new Date(d) <= new Date())
          return false;
      }

      return true;
    }).sort((a: sportsEvents, b: sportsEvents) => {      
      const x = new Date(a.date[0]).getTime();
      const y = new Date(b.date[0]).getTime();

      return x - y;
    });
  }

  selectPrecedingEvents(events: sportsEvents[]) {
    return events.filter((x: sportsEvents) => {
      for(let d of x.date){
        if (new Date(d) > new Date())
          return false;
      }

      return true;
    }).sort((a: sportsEvents, b: sportsEvents) => {      
      const x = new Date(a.date[0]).getTime();
      const y = new Date(b.date[0]).getTime();

      return y - x;
    });
  }

}


