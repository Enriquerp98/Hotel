import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firestore/firestore.service';

@Component({
  selector: 'app-huespedes',
  templateUrl: './huespedes.component.html',
  styleUrls: ['./huespedes.component.css']
})
export class HuespedesComponent implements OnInit {
  public habsOcupadas: any;
  // Constructor
  constructor(private firestoreService: FirestoreService) {
  }
  // Methods
  // ngOnInit
  ngOnInit() {
    this.firestoreService.getHabs().subscribe((habsSnapshot) => {
      this.habsOcupadas = [];
      habsSnapshot.forEach((habData: any) => {
        this.habsOcupadas.push({
          id: habData.payload.doc.id,
          data: habData.payload.doc.data()
        });
        console.log(habData.payload.doc.data().libre);
      });
    });
  }
}
