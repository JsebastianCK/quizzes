import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconRegistry,MatIconModule} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CmsRoutingModule } from './cms-routing.module';

import { CmsComponent } from './cms.component';
import { SeriesComponent } from './series/series.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [CmsComponent,SeriesComponent, InfoComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ]
})
export class CmsModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
  }
}
