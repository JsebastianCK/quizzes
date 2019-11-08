import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  configuracion: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getConfiguracion().subscribe(
      (res) => {this.configuracion = res;},
      (err) => {},
      () => {

      }
    )
  }

}
