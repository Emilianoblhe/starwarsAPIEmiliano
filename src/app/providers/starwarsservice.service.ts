import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarwarsserviceService {

  constructor(private http: HttpClient) { }

  private consumirServicio(consulta: string): Observable<object> {
    const urlBase = `https://swapi.dev/api/${consulta}`;
    return this.http.get(urlBase);
  }

  consultarPersonaje(personaje: string): Observable<object> {
    return this.consumirServicio(`people/?search=${personaje}`)
      .pipe( map(data => data['results']));
  }

  obtenerPersonajes(): Observable<object> {
    return this.consumirServicio('people/')
      .pipe( map(data => data['results']));
  }

  obtenerPlaneta(url: string): Observable<object> {
    return this.http.get(url);
  }
}
