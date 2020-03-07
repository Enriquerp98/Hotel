import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firestore/firestore.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-huespedes',
  templateUrl: './huespedes.component.html',
  styleUrls: ['./huespedes.component.css']
})
export class HuespedesComponent implements OnInit {
  public habitaciones = [];

  public documentId = null;
  public currentStatus = 1;
  public huespedForm = new FormGroup({
    planta: new FormControl(''),
    habitacion: new FormControl(''),
    libre: new FormControl(''),
    huesped: new FormControl('', Validators.required),
    id: new FormControl('')
  });
  // Constructor
  constructor(private firestoreService: FirestoreService) {
    this.huespedForm.setValue({
      id: '',
      planta: '',
      habitacion: '',
      libre: null,
      huesped: ''
    });
  }
  // Funciones
  public addHues(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus === 2) {
      const data = {
        huesped: '',
        libre: form.libre,
        planta: form.planta,
        habitacion: form.habitacion
      };
      this.firestoreService.updateHab(documentId, data).then(() => {
        this.currentStatus = 1;
        this.huespedForm.setValue({
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

  public editHab(documentId) {
    const editSubscribe = this.firestoreService.getHab(documentId).subscribe((hab) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      // console.log(hab.payload.data().libre);
      // console.log(this.libreText);
      this.huespedForm.setValue({
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
  // ngOnInit
  ngOnInit() {
    this.firestoreService.getHabs().subscribe((habitacionesSnapshot) => {
      this.habitaciones = [];
      habitacionesSnapshot.forEach((habitacionData: any) => {
        this.habitaciones.push({
          id: habitacionData.payload.doc.id,
          data: habitacionData.payload.doc.data()
        });
        console.log(habitacionData.payload.doc.data().libre);
      });
    });
  }
}
