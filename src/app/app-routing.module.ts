import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './component/main-page/main-page.component';
import { PreviewPageComponent } from './component/preview-page/preview-page.component';
import { InfoPageComponent } from './component/info-page/info-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'event/:id', component: InfoPageComponent},
  {path: 'preview', component: PreviewPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
