import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {

  constructor(private firestoreService: FirestoreService) { }
// Para rpobar subida a git
  ngOnInit() {
  }

}
