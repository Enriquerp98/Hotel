import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
/// FIREBASE ///
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
//////////////
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HuespedesComponent } from './huespedes/huespedes.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { SobreComponent } from './sobre/sobre.component';


@NgModule({
  declarations: [
    AppComponent,
    HabitacionesComponent,
    HuespedesComponent,
    MenuComponent,
    FooterComponent,
    ErrorComponent,
    SobreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
