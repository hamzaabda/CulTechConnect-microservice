// list.component.ts

import { Component, OnInit } from '@angular/core';
import { ReclamationService } from './reclamation.service';
import { Reclamation, EventType } from './recalamation.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  feedbacks: Reclamation[] = [];
  traiteStatus: { [id: number]: boolean } = {}; // Dictionnaire pour le statut de traitement

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.reclamationService.getAllFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  ajouterReclamation(): void {
    // Créez une nouvelle réclamation et ajoutez-la à la liste comme précédemment
  }

  marquerCommeTraite(id: number): void {
    // Utilisez l'ID pour marquer la réclamation comme traitée ou non
    this.traiteStatus[id] = !this.traiteStatus[id];
  }

  estTraite(id: number): boolean {
    // Vérifiez si la réclamation est traitée ou non
    return this.traiteStatus[id];
  }
}
