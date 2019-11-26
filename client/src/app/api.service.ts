import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUri: string = `http://${environment.ip}:5000`;

  constructor(private http: HttpClient) { }

  subirImagePregunta(imagen) {
    console.log(imagen);
    return this.http.post(`${this.baseUri}/pregunta/imagen`, imagen);
  }

  // Pregunta
  getPreguntas(): Observable<Object> {
    return this.http.get(this.baseUri + '/pregunta');
  }

  getPregunta(id): Observable<any> {
    return this.http.get(this.baseUri + '/pregunta/' + id);
  }

  deletePregunta(idPregunta): Observable<any> {
    return this.http.delete(`${this.baseUri}/pregunta/${idPregunta}`);
  }

  updatePregunta(pregunta): Observable<Object> {
    return this.http.put(this.baseUri + '/pregunta' , pregunta);
  }

  createPregunta(pregunta): Observable<Object> {
    return this.http.post(this.baseUri + '/pregunta' , pregunta);
  }

  getRespuestasPorPregunta(idPregunta): Observable<Object> {
    return this.http.get(`${this.baseUri}/pregunta/${idPregunta}/respuestas`);
  }
  
  // Jugador
  getJugadores(): Observable<any> {
    return this.http.get(this.baseUri + '/jugador');
  }

  getJugador(idJugador): Observable<any> {
    return this.http.get(this.baseUri + '/jugador/' + idJugador);
  }

  updateJugador(jugador): Observable<Object> {
    return this.http.put(this.baseUri + '/jugador' , jugador);
  }

  // Juego
  getJuegos(): Observable<any> {
    return this.http.get(this.baseUri + '/juego');
  }

  getJuego(id): Observable<any> {
    return this.http.get(this.baseUri + '/juego/' + id);
  }

  createJuego(juego): Observable<any> {
    return this.http.post(this.baseUri + '/juego/' , juego);
  }

  deleteJuego(idJuego): Observable<Object> {
    return this.http.delete(this.baseUri + '/juego/' + idJuego);
  }

  insertPregunta(data): Observable<Object> {
    return this.http.post(this.baseUri + '/serie/', data);
  }

  getPreguntasPorJuego(idJuego): Observable<any> {
    return this.http.get(`${this.baseUri}/juego/${idJuego}/preguntas`);
  }

  // Respuesta
  insertRespuesta(respuesta): Observable<any> {
    return this.http.post(`${this.baseUri}/respuesta` , respuesta);
  }

  deleteRespuesta(idRespuesta): Observable<Object> {
    return this.http.delete(`${this.baseUri}/respuesta/${idRespuesta}`);
  }

  updateRespuesta(respuesta): Observable<Object> {
    return this.http.put(`${this.baseUri}/respuesta` , respuesta);
  }

  updateRespuestaCorrecta(respuesta): Observable<Object> {
    return this.http.put(`${this.baseUri}/respuesta/correcta` , respuesta);
  }

  // Configuracion
  getConfiguracion() {
    return this.http.get(`${this.baseUri}/configuracion`);
  }
  
  updateConfiguracion(configuracion) {
    return this.http.put(`${this.baseUri}/configuracion` , configuracion);
  }
}
