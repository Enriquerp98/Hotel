import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {
  public libreText = '';
  public booleano = false;
  public habs = [];

  public documentId = null;
  public currentStatus = 1;
  public newHabForm = new FormGroup({
    planta: new FormControl('', Validators.required),
    habitacion: new FormControl('', Validators.required),
    libre: new FormControl('', Validators.required),
    huesped: new FormControl(''),
    id: new FormControl('')
  });

  constructor(private firestoreService: FirestoreService) {
    this.newHabForm.setValue({
      id: '',
      planta: '',
      habitacion: '',
      libre: null,
      huesped: ''
    });
  }
  public newHab(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (form.libre === 'true') {
      this.booleano = true;
    }
    console.log('Boolean: ' + this.booleano);
    if (this.currentStatus === 1) {
      const data = {
        huesped: '',
        planta: form.planta,
        habitacion: form.habitacion,
        libre: this.booleano
      }
      this.firestoreService.createHab(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.booleano = false;
        this.newHabForm.setValue({
          huesped: '',
          libre: '',
          planta: '',
          habitacion: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      if (form.libre === 'true') {
        this.booleano = true;
      }
      console.log('Boolean 2: ' + this.booleano);
      const data = {
        huesped: '',
        libre: this.booleano,
        planta: form.planta,
        habitacion: form.habitacion
      }
      this.firestoreService.updateHab(documentId, data).then(() => {
        this.booleano = false;
        this.currentStatus = 1;
        this.newHabForm.setValue({
          huesped: '',
          libre: '',
          planta: '',
          habitacion: '',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }
  // EDITAR
  public editHab(documentId) {
    const editSubscribe = this.firestoreService.getHab(documentId).subscribe((hab) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newHabForm.setValue({
        id: documentId,
        // @ts-ignore
        planta: hab.payload.data().planta,
        // @ts-ignore
        habitacion: hab.payload.data().habitacion,
        // @ts-ignore
        libre: hab.payload.data().libre,
        // @ts-ignore
        huesped: hab.payload.data().huesped
      });
      editSubscribe.unsubscribe();
    });
  }
  // BORRAR
  public deleteHab(documentId) {
    this.firestoreService.deleteHab(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }
  ngOnInit() {
    this.firestoreService.getHabs().subscribe((habsSnapshot) => {
      this.habs = [];
      habsSnapshot.forEach((habData: any) => {
        this.habs.push({
          id: habData.payload.doc.id,
          data: habData.payload.doc.data()
        });
        console.log(habData.payload.doc.data().libre);
      });
    });
  }
}
