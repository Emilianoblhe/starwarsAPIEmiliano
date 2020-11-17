import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarwarsserviceService } from '../../providers/starwarsservice.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styles: [
  ]
})
export class PersonajesComponent implements OnInit {

  private query: string;
  personajes: any[] = [];
  ordenamiento: string;
  bloquear: boolean;
  constructor(private activateRoute: ActivatedRoute,
              private starWarsService: StarwarsserviceService) {

                this.bloquear = true;
                this.activateRoute.queryParams.subscribe(params => {
                  this.query = params['ordenar'];
                  // FALTA VALIDAR SI NO HAY UN PARAMETRO, MANDARLO AL
                  this.starWarsService.getPeople()
                  .subscribe(
                      (response: any) => {
                        response.map(x => {
                          this.personajes.push(x);
                        })
                      }, e => {
                        this.bloquear = false;
                      }, () => {
                        this.ordenarPersonajes(this.query);
                        this.bloquear = false;
                      }
                    );
                });
              }
  ngOnInit(): void {
  }

  ordenarPersonajes(criterio: string): void {
    switch (criterio) {
      case 'nombre':
        this.personajes = this.personajes.sort(this.ordenarNombre);
        this.ordenamiento = 'nombre';
        break;
      case 'peso':
        this.personajes = this.personajes.sort(this.ordenarPeso);
        this.ordenamiento = 'peso';
        break;
      case 'altura':
        this.personajes = this.personajes.sort(this.ordenarAltura);
        this.ordenamiento = 'altura';
        break;
      default:
        this.personajes = this.personajes.sort(this.ordenarNombre);
        this.ordenamiento = 'nombre';
    }
  }

  ordenarNombre(a, b) {
    const name1 = a.name.toUpperCase();
    const name2 = b.name.toUpperCase();

    let compara = 0;
    if (name1 > name2) {
      compara = 1;
    } else if (name1 < name2) {
      compara = -1;
    }
    return compara;
  }

  ordenarPeso(a, b) {

    let numero1 = 0;
    let numero2 = 0;
    try{
      numero1 = parseInt(a.mass);
      numero2 = parseInt(b.mass);
    }
    catch {
      numero1 = 0;
      numero2 = 0;
    }

    let compara = 0;
    if (numero1 > numero2) {
      compara = 1;
    } else if (numero1 < numero2) {
      compara = -1;
    }
    return compara;
  }

  ordenarAltura(a, b) {
    const numero1 = parseInt(a.height);
    const numero2 = parseInt(b.height);
    let compara = 0;
    if (numero1 > numero2) {
      compara = 1;
    } else if (numero1 < numero2) {
      compara = -1;
    }
    return compara;
  }
}
