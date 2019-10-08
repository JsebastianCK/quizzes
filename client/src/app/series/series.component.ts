import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  juegos;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.juegos = this.api.getJuegos();
  }

}
