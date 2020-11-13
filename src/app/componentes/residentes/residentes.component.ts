import { Component, OnInit } from '@angular/core';
import { StarwarsserviceService } from '../../providers/starwarsservice.service';

@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styles: [
  ]
})
export class ResidentesComponent implements OnInit {

  personajes: any[] = [];
  personajePlaneta: Personaje[] = [];
  constructor(private starWarsService: StarwarsserviceService) {
    this.starWarsService.obtenerPersonajes()
      .subscribe(
        (response: any) => {
          this.personajes = response;
        }, e => {

        }, () => {
          this.personajes.forEach(personaje => {
            this.obtenrPlaneta(personaje.homeworld, personaje.name, personaje.created, personaje.gender, personaje.height, personaje.mass);
          });
          this.personajePlaneta = this.personajePlaneta.sort(this.ordenarNombre);
          console.log(this.personajePlaneta);
          console.log('aqquu');
        }
      );
  }

  ngOnInit(): void {
  }

  obtenrPlaneta(url: string, name: string, created: string, gender: string, height: string, mass: string): void {
    let planeta: any;
    this.starWarsService.obtenerPlaneta(url)
    .subscribe(
      (response: any) => {
        planeta = response;
      }, e => {

      }, () => {
        let p: Personaje = {
          name: name,
          created: created,
          gender: gender,
          height: height,
          mass: mass,
          planeta: planeta.name
        };
        this.personajePlaneta.push(p);
      }
    );
  }

  ordenarNombre(a, b) {
    const planeta1 = a.planeta.toUpperCase();
    const planeta2 = b.planeta.toUpperCase();
    console.log(planeta1);
    console.log(planeta2);

    let compara = 0;
    if (planeta1 > planeta2) {
      compara = 1;
    } else if (planeta1 < planeta2) {
      compara = -1;
    }
    return compara;
  }
}

class Personaje {
  name: string;
  created: string;
  gender: string;
  height: string;
  mass: string;
  planeta: string;
}
