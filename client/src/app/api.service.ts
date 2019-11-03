import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUri: string = `http://${environment.ip}:5000`;

  constructor(private http: HttpClient) { }

  // Pregunta
  getPreguntas(): Observable<Object> {
    return this.http.get(this.baseUri + '/pregunta');
  }

  getPregunta(id): Observable<any> {
    return this.http.get(this.baseUri + '/pregunta/' + id);
  }

  updatePregunta(pregunta): Observable<Object> {
    return this.http.put(this.baseUri + '/pregunta' , pregunta);
  }

  getRespuestasPorPregunta(idPregunta): Observable<Object> {
    return this.http.get(`${this.baseUri}/pregunta/${idPregunta}/respuestas`);
  }
  
  // Jugador
  getJugadores(): Observable<Object> {
    return this.http.get(this.baseUri + '/jugador');
  }

  updatePuntaje(jugador): Observable<Object> {
    return this.http.put(this.baseUri + '/jugador' , jugador);
  }

  // Juego
  getJuegos(): Observable<any> {
    return this.http.get(this.baseUri + '/juego');
  }

  getJuego(id): Observable<Object> {
    return this.http.get(this.baseUri + '/juego/' + id);
  }

  getPreguntasPorJuego(idJuego): Observable<any> {
    return this.http.get(`${this.baseUri}/juego/${idJuego}/preguntas`);
  }

}
