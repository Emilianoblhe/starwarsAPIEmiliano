import { RouterModule, Routes } from '@angular/router';
import { PersonajeComponent } from './componentes/personaje/personaje.component';
import { PersonajesComponent } from './componentes/personajes/personajes.component';
import { ResidentesComponent } from './componentes/residentes/residentes.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

export const RUTAS: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'personaje/:nombre', component: PersonajeComponent },
    { path: 'personajes/:criterio', component: PersonajesComponent },
    { path: 'residentes', component: ResidentesComponent },
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(RUTAS);