import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonajeComponent } from './componentes/personaje/personaje.component';
import { PersonajesComponent } from './componentes/personajes/personajes.component';
import { ResidentesComponent } from './componentes/residentes/residentes.component';
import { NavbarComponent } from './compartidos/navbar/navbar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { Router, Routes } from '@angular/router';
import { APP_ROUTING } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { CartapersonajeComponent } from './componentes/cartapersonaje/cartapersonaje.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonajeComponent,
    PersonajesComponent,
    ResidentesComponent,
    NavbarComponent,
    InicioComponent,
    CartapersonajeComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
