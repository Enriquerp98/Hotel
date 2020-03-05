import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

// Crea una habitación
  public createHab(data: {planta: string, habitacion: string, libre: boolean}) {
    return this.firestore.collection('habs').add(data);
  }  // Obtiene una habitacion
  public getHab(documentId: string) {
    return this.firestore.collection('habs').doc(documentId).snapshotChanges();
  }  // Obtiene todas las habitaciones
  public getHabs() {
    return this.firestore.collection('habs').snapshotChanges();
  }  // Actualiza una habitacion
  public updateHab(documentId: string, data: any) {
    return this.firestore.collection('habs').doc(documentId).set(data);
  }
  public deleteHab(documentId: string) { // Para borrar una habitacion
    return this.firestore.collection('habs').doc(documentId).delete();
  }
  // public filtrado() {
    /*return this.firestore.collection
    ('habs', ref => ref.where('libre', '==', false)).valueChanges();*/
    /*const habitaciones = this.firestore.collection('habs');
    const query = habitaciones.where('libre', '==', false).get()
      .then(snapshot => {
        if(snapshot.empty) {
          console.log('No hay documentos');
          return;
        }
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(error => {
        console.log('Error', error);
      });*/
  // }
}
