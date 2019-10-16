import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsComponent } from './cms/cms.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: 'cms', component: CmsComponent},
  {path: '' , component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
