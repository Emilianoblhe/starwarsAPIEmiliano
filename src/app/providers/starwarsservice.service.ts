import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';

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

  private obtenerPersonajesPagina(paginas: number[]): any {
    return from(paginas).pipe(
         concatMap(pagina => <Observable<any>> this.http.get(`https://swapi.dev/api/people/?page=${pagina}`))
       );
  }

  getPeople(): Observable<object> {
    const paginas = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return this.obtenerPersonajesPagina(paginas)
    .pipe( map(data => data['results']));
  }

}
