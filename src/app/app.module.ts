import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
///FIREBASE///
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore} from "@angular/fire/firestore";
import { environment } from '../environments/environment';
//////////////


@NgModule({
  declarations: [
    AppComponent,
    HabitacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestore,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
