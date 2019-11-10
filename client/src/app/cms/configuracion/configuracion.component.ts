import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  configuracion: any;

  imagenUrl;

  constructor(private api: ApiService, private fb: FormBuilder, private snackBar: MatSnackBar, private domSanitizer: DomSanitizer) {
    this.configuracion = this.fb.group([{
      titulo: ['', Validators.required],
      tiempoPregunta: ['', Validators.required],
      mensajeBienvenida: ['', Validators.required]
    }]);
  }

  ngOnInit() {

    this.api.getConfiguracion().subscribe(
      (res) => {this.configuracion = res[0]},
      (err) => {},
      () => {
        let TYPED_ARRAY = new Uint8Array(this.configuracion.imagenPresentacion.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {return data + String.fromCharCode(byte);}, '');
        let base64String = btoa(STRING_CHAR);

        this.configuracion.imagenPresentacion = base64String;
        this.imagenUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
      }
    )
  }

  guardarConfiguracion() {
    this.configuracion.imagenPresentacion = this.imagenUrl.substring(22);
    this.api.updateConfiguracion(this.configuracion).subscribe(
      (res) => {console.log(res)},
      (err) => {console.log(err)},
      () => {
        this.snackBar.open('Se guardo correctamente la configuracion!','' ,{
          duration: 2500
        })
      }
    )
  }

  onUpload(event) {
    this.configuracion.imagenPresentacion = event.target.files[0];
    console.log(this.configuracion.imagenPresentacion);
    var reader = new FileReader();
    reader.readAsDataURL(this.configuracion.imagenPresentacion);
    reader.onload = () => {
      this.imagenUrl = reader.result;
    };
  }

}
