import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {MatIconRegistry,MatIconModule} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatButtonModule, MatTooltipModule , MatCheckboxModule, MatDialogModule, MatProgressBarModule, MatPaginatorModule, MatSnackBarModule} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';

import { CmsRoutingModule } from './cms-routing.module';

import { CmsComponent } from './cms.component';
import { SeriesComponent } from './series/series.component';
import { InfoComponent } from './info/info.component';
import { SeriesCreateComponent } from './series/series-create/series-create.component';
import { SeriesUpdateComponent } from './series/series-update/series-update.component';
import { SeriesFormComponent } from './series/series-form/series-form.component';
import { RespuestaFormComponent } from './series/respuesta-form/respuesta-form.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { JugadorComponent } from './info/jugador/jugador.component';
import { ControlComponent } from './control/control.component';

@NgModule({
  declarations: [CmsComponent,SeriesComponent, InfoComponent, SeriesCreateComponent, SeriesUpdateComponent, SeriesFormComponent, RespuestaFormComponent, ConfiguracionComponent, JugadorComponent, ControlComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    FormsModule,
    MatTooltipModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    ColorPickerModule
  ],
})
export class CmsModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
  }
}
