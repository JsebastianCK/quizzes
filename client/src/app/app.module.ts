import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

// Services
import { WebsocketService } from './websocket.service';
import { ApiService } from './api.service';
import { SeriesComponent } from './series/series.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    SeriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [WebsocketService , ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
