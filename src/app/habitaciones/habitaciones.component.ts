import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {
  public claseActiva = 'bg-success';
  public libreText = '';
  public habs = [];

  public documentId = null;
  public currentStatus = 1;
  public newHabForm = new FormGroup({
    planta: new FormControl('', Validators.required),
    habitacion: new FormControl('', Validators.required),
    id: new FormControl(''),
    libre: new FormControl('', Validators.required)
  });

  constructor(private firestoreService: FirestoreService) {
    this.newHabForm.setValue({
      id: '',
      planta: '',
      habitacion: '',
      libre: true
    });
  }
  public newHab(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus === 1) {
      const data = {
        planta: form.planta,
        habitacion: form.habitacion,
        libre: form.libre
      }
      this.firestoreService.createHab(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newHabForm.setValue({
          libre: true,
          planta: '',
          habitacion: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      const data = {
        libre: true,
        planta: form.planta,
        habitacion: form.habitacion
      }
      this.firestoreService.updateHab(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newHabForm.setValue({
          libre: true,
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
      // console.log(hab.payload.data().libre);
      this.newHabForm.setValue({
        id: documentId,
        // @ts-ignore
        planta: hab.payload.data().planta,
        // @ts-ignore
        habitacion: hab.payload.data().habitacion,
        // @ts-ignore
        libre: hab.payload.data().libre
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
  public CambiarColor(libre: boolean, id: string) {
    // Prueba
    if (libre) {
      console.log(id + ': Libre - ' + libre);
      this.claseActiva = 'bg-success';
      this.libreText = 'Libre';
    } else {
      console.log(id + ': Ocupada - ' + libre);
      this.claseActiva = 'bg-danger';
      this.libreText = 'Ocupada';
    }
  }
  ngOnInit() {
    // document.getElementById('libre').className = 'bg-primary';
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
