// reclamation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from './recalamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private baseUrl = 'http://localhost:9000/api/reclamation/feedback';

  constructor(private http: HttpClient) {}

  getAllFeedbacks(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/afficher`);
  }
}
