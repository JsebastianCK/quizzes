import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUri: string = 'http://192.168.1.62:5000';

  constructor(private http: HttpClient) { }

  getPreguntas(): Observable<Object> {
    return this.http.get(this.baseUri + '/pregunta')
  }

  getJuegos(): Observable<Object> {
    return this.http.get(this.baseUri + '/juego')
  }

  getJugadores(): Observable<Object> {
    return this.http.get(this.baseUri + '/jugador')
  }

}
