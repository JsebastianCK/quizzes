import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUri: string = 'http://192.168.1.62:5000';

  constructor(private http: HttpClient) { }

  // Pregunta
  getPreguntas(): Observable<Object> {
    return this.http.get(this.baseUri + '/pregunta')
  }

  getRespuestasPorPregunta(idPregunta): Observable<Object> {
    return this.http.get(`${this.baseUri}/pregunta/${idPregunta}/respuestas`);
  }
  
  // Jugador
  getJugadores(): Observable<Object> {
    return this.http.get(this.baseUri + '/jugador')
  }

  // Juego
  getJuegos(): Observable<Object> {
    return this.http.get(this.baseUri + '/juego')
  }

  getJuego(id): Observable<Object> {
    return this.http.get(this.baseUri + '/juego/' + id);
  }

  getPreguntasPorJuego(idJuego): Observable<any> {
    return this.http.get(`${this.baseUri}/juego/${idJuego}/preguntas`);
  }

}
