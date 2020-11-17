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
  bloquear: boolean;

  constructor(private starWarsService: StarwarsserviceService) {

    this.bloquear = true;
    this.starWarsService.getPeople()
                  .subscribe(
                      (response: any) => {
                        response.map(x => {
                          this.personajes.push(x);
                        });
                      }, e => {
                        this.bloquear = false;
                      }, () => {
                        this.personajes.map(x => {
                          this.starWarsService.obtenerPlaneta(x.homeworld)
                            .subscribe(
                              (response: any) => {

                                let p: Personaje = {
                                  name: x.name,
                                  created: x.created,
                                  gender: x.gender,
                                  height: x.height,
                                  mass: x.mass,
                                  planeta: response.name
                                };
                                this.personajePlaneta.push(p);
                              }, e => {
                                this.bloquear = false;
                              }, () => {
                                this.personajePlaneta = this.personajePlaneta.sort(this.ordenarPlaneta);
                                this.bloquear = false;
                              }
                            );
                        });
                        this.bloquear = false;
                      }
                    );

  }

  ngOnInit(): void {
  }

  ordenarPlaneta(a, b) {
    const planeta1 = a.planeta.toUpperCase();
    const planeta2 = b.planeta.toUpperCase();

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
  public name: string;
  public created: string;
  public gender: string;
  public height: string;
  public mass: string;
  public planeta: string;
}
