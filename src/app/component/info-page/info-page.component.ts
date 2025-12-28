import { Component, DebugNode, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { formatTimestamp } from 'src/app/helpers/helper';
import { emptySportsEvent, sportsEvents } from 'src/app/interfaces/sportsEvents';
import { SportsEventsService } from 'src/app/service/sports-events.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent {
  @Input('preview') preview = '';

  eventId: string | null = "";
  event: sportsEvents = emptySportsEvent;
  linksValues: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private sportsEventsService: SportsEventsService) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.loadEvent();
  }

  async loadEvent(){
    const preview = window.localStorage.getItem('preview') === 'true';
    let aux = await this.sportsEventsService.getSportEvents(this.eventId ?? "", preview);
    this.event = aux;
  }

  formatTimestamp(date: Date[]){
    if (!date) return "";
    return formatTimestamp(date);
  }
  
  selectEvent(){
    // window.scrollTo(0,0);
    const preview = window.localStorage.getItem('preview');
    this.router.navigate([preview ? '/preview' : '']);
  }

  countDescriptionLines() {
    return this.event ? this.event.description ? 
      `height: ${this.event?.description?.split('-').length * 15}px` :
      `display: none` : '';
  }

  getDescriptionWithoutLinks() {
    const links = [];
    let desc = this.event ? this.event.description : '';

    const linksAmount = desc?.toUpperCase().split("HTTP").length - 1;

    for(let i=0; i<linksAmount; i++)
    {
      const httpsPosition = desc?.toUpperCase().indexOf("HTTP");
  
      const firstHalf = desc?.slice(0, httpsPosition);
      const firstBL = firstHalf.lastIndexOf('\n');
  
  
      const secondHalf = desc?.slice(httpsPosition);
      const secondBL = secondHalf.indexOf('\n');
  
      const linkLine = firstHalf.slice(firstBL) + secondHalf.slice(0, secondBL);
      links.push(linkLine);

      desc = firstHalf.slice(0, firstBL) + secondHalf.slice(secondBL);
    }

    this.linksValues = links;
    
    const fDesc = this.removeFinalBreakLines(desc);
    return fDesc;
  }

  removeFinalBreakLines(text: string){
    let cont = 0;

    while(text?.length - text?.lastIndexOf('\n') < 2){
      text = text.slice(0, text?.lastIndexOf('\n'));
      cont++;
      if (cont > 50)
        break;
    }
      

      return text;
  }

  getTextLinkPart(text: string){
    const idx = text?.toUpperCase().indexOf("HTTP");
    return text?.slice(0, idx).replaceAll("\n", "");
  }

  getUrlLinkPart(text: string){
    const idx = text?.toUpperCase().indexOf("HTTP");
    return text?.slice(idx).replaceAll("\n","");
  }


}
