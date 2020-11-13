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
  constructor(private activateRoute: ActivatedRoute,
              private starWarsService: StarwarsserviceService) {
                this.activateRoute.params.subscribe(x => {
                  this.query = x['criterio'];
                  this.starWarsService.obtenerPersonajes()
                  .subscribe(
                    (response: any) => {
                      this.personajes = response;
                    }, e => {

                    }, () => {
                      this.ordenarPersonajes(this.query);
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
    const numero1 = parseInt(a.mass);
    const numero2 = parseInt(b.mass);

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
