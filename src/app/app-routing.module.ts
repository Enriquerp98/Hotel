import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HuespedesComponent} from './huespedes/huespedes.component';
import {HabitacionesComponent} from './habitaciones/habitaciones.component';
import {ErrorComponent} from './error/error.component';
import {SobreComponent} from './sobre/sobre.component';



const routes: Routes = [
  {path: '', component: SobreComponent},
  {path: 'huespedes', component: HuespedesComponent},
  {path: 'habitaciones', component: HabitacionesComponent},
  {path: '**', component: ErrorComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
