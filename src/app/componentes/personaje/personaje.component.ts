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
  private personaje: any;
  name: string;
  created: string;
  gender: string;
  height: string;
  mass: string;

  constructor(private activateRoute: ActivatedRoute,
              private starWarsService: StarwarsserviceService) {

    this.activateRoute.params.subscribe(x => {
      this.query = x['nombre'];
      this.starWarsService.consultarPersonaje(this.query)
        .subscribe(
          response => {
            this.personaje = response;
            console.log(this.personaje);
            this.name = this.personaje[0].name;
            this.created = this.personaje[0].created;
            this.gender = this.personaje[0].gender;
            this.height = this.personaje[0].height;
            this.mass = this.personaje[0].mass;
          }, e => {

          }, () => {

          }
        );
    });
  }

  ngOnInit(): void {
  }

}
