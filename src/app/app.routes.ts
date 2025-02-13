import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { ServicioComponent } from './servicio/servicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LocalReferenceComponent } from './local-reference/local-reference.component';
import { ForComponent } from './for/for.component';

export const routes: Routes = [
    {path:'',redirectTo:'/inicio',pathMatch:'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'servicios', component: ServicioComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'localReference', component: LocalReferenceComponent},
    {path: 'for', component: ForComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
