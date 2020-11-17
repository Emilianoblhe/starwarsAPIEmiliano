import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarwarsserviceService } from '../../providers/starwarsservice.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styles: [
  ]
})
export class PersonajeComponent implements OnInit {

  private query: string;
  private personaje: any[] = [];
  bloquear: boolean;

  constructor(private activateRoute: ActivatedRoute,
              private starWarsService: StarwarsserviceService) {
                this.bloquear = true;
                this.activateRoute.params.subscribe(x => {
                  this.query = x['nombre'];
                  this.starWarsService.consultarPersonaje(this.query)
                    .subscribe(
                      (response: any) => {
                        this.personaje = response;
                      }, e => {
                        this.bloquear = false;
                      }, () => {
                        this.bloquear = false;
                      }
                    );
                });
  }

  ngOnInit(): void {
  }

}
