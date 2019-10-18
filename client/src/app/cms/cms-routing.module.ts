import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmsComponent } from './cms.component'
import { SeriesComponent } from './series/series.component'
import { InfoComponent } from './info/info.component'

const routes: Routes = [
    {
        path: 'cms',
        component: CmsComponent,
        children: [
            {
                path: 'juego',
                component: SeriesComponent
            },
            {
                path: 'info',
                component: InfoComponent
            },
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
