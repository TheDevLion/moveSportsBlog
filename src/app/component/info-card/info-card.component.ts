import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { emptySportsEvent, sportsEvents } from 'src/app/interfaces/sportsEvents';
import { formatTimestamp } from 'src/app/helpers/helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent {
  @Input('event') event = emptySportsEvent;
  @Input('preview') preview = '';

  constructor(private router: Router) {}

  formatTimestamp(date: Date[]){
    return formatTimestamp(date);
  }

  selectEvent(){
    this.router.navigate([`/event`, this.event.id]);
  }

}
