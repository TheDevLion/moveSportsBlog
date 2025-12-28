import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { sportsEvents } from '../interfaces/sportsEvents';

@Injectable({
  providedIn: 'root'
})
export class SportsEventsService {

  constructor() { }

  

  async baseGraphCMSFetch (mutation: {query: string}) {
    var data = await fetch(environment.apiUrl, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "authorization": `Bearer ${environment.apiKey}`
        },
        body: JSON.stringify(mutation)
    }).then(resp => resp.json());

    return data;
}

  private async fetchEventByStage(id: string, stage: "DRAFT" | "PUBLISHED") {
    const cmsQuery = `query MyQuery {
      sportsEvents(stage: ${stage}, where: {id: "${id}"} ){
       id
       title
       description
       date
       address
       price
       flagStatus
       imgUrl
     }                 
   }`;

    const response = (await this.baseGraphCMSFetch({query: cmsQuery}));
    return response?.data?.sportsEvents?.[0];
  }

  async getSportsEvents(value: boolean) {
    const cmsQuery = `query MyQuery {
      sportsEvents(stage: ${value ? "DRAFT" : "PUBLISHED"}, last: 50 ){
       id
       title
       description
       date
       address
       price
       flagStatus
       imgUrl
     }                 
   }`

    const response = (await this.baseGraphCMSFetch({query: cmsQuery}));
    const result = response?.data?.sportsEvents;
   
    return value ? result : result.filter((x: sportsEvents) => x.flagStatus === 'confirmed' || x.flagStatus === 'done');
  }

  async getSportEvents(id: string, preview: boolean) {
    const published = await this.fetchEventByStage(id, "PUBLISHED");
    if (published) {
      return published;
    }

    if (preview) {
      return await this.fetchEventByStage(id, "DRAFT");
    }

    return undefined;
  }
}
