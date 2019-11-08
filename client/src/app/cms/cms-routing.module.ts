import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmsComponent } from './cms.component';
import { SeriesComponent } from './series/series.component';
import { SeriesCreateComponent } from './series/series-create/series-create.component';
import { SeriesUpdateComponent } from './series/series-update/series-update.component';

import { InfoComponent } from './info/info.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { SeriesFormComponent } from './series/series-form/series-form.component';

const routes: Routes = [
    {
        path: 'cms',
        component: CmsComponent,
        children: [
            {
                path: 'juego',
                children: [
                    {path: '', component: SeriesComponent},
                    {path: 'create', component: SeriesCreateComponent},
                    {path: 'form', component: SeriesFormComponent},
                    {path: ':idJuego', component: SeriesUpdateComponent},
                ]
            },
            {
                path: 'info',
                component: InfoComponent
            },
            {
                path: 'configuracion',
                component: ConfiguracionComponent
            },
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
