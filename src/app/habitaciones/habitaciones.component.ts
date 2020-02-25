import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {

  public habs = [];

  public documentId = null;
  public currentStatus = 1;
  public newHabForm = new FormGroup({
    planta: new FormControl('', Validators.required),
    habitacion: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  constructor(private firestoreService: FirestoreService) {
    this.newHabForm.setValue({
      id: '',
      planta: '',
      habitacion: ''
    });
  }
  public newHab(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus === 1) {
      const data = {
        planta: form.planta,
        habitacion: form.habitacion
      }
      this.firestoreService.createHab(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newHabForm.setValue({
          nombre: '',
          url: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      const data = {
        nombre: form.nombre,
        url: form.url
      }
      this.firestoreService.updateHab(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newHabForm.setValue({
          nombre: '',
          url: '',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }
  ngOnInit() {
    this.firestoreService.getHabs().subscribe((habsSnapshot) => {
      this.habs = [];
      habsSnapshot.forEach((habData: any) => {
        this.habs.push({
          id: habData.payload.doc.id,
          data: habData.payload.doc.data()
        });
      });
    });
  }
}
