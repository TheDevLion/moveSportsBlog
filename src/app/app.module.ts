import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { InfoCardComponent } from './component/info-card/info-card.component';
import { InfoPageComponent } from './component/info-page/info-page.component';
import { PreviewPageComponent } from './component/preview-page/preview-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InfoCardComponent,
    InfoPageComponent,
    PreviewPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
