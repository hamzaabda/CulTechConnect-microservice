import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Parteneriat } from '../modules/models/parteneriat';

@Injectable({
  providedIn: 'root'
})
export class PartnershipService {
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     "Content-Type": "application/json",
  //   }),
  // };

  b: boolean = false;
  text: string = "";

  apiUrl = "http://localhost:9000/api/partenariat/Parteneriat";
  constructor(private http: HttpClient) {}

  getPartnerships(): Observable<Parteneriat[]> {
    return this.http.get<Parteneriat[]>(this.apiUrl +"/getAllParteneriat");
  }

  deleteParteneriat(id: number): Observable<Parteneriat> {
    return this.http.delete<Parteneriat>(
      this.apiUrl + "/deleteParteneriat/" + id
    );
  }

  addParteneriat(p: Parteneriat): Observable<Parteneriat> {
    return this.http.post<Parteneriat>(
      this.apiUrl + "/createParteneriat",
      p
      // ,
      // this.httpOptions
    );
  }

  updateParteneriat(id: number, parteneriat: Parteneriat): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateParteneriat/${id}`, parteneriat)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError('Parteneriat not found');
    } else {
      console.error('An error occurred:', error);
      return throwError('An error occurred. Please try again later.');
    }
  }


  getParteneriatById(id: number): Observable<Parteneriat> {
    return this.http.get<Parteneriat>(this.apiUrl + "/getParteneriatById/" + id);
  }

  verifyParteneriat(id: number): Observable<Parteneriat> {
    return this.http.get<Parteneriat>(this.apiUrl + "/verify/" + id);
  }
  
  cancelPartnership(id: number): Observable<Parteneriat> {
    return this.http.get<Parteneriat>(this.apiUrl + "/cancelParteneriat/" + id);
  }


  assignEventToParteneriat(partnershipId: number, eventId: number): Observable<string> {
    const url = `${this.apiUrl}/assign-event/${partnershipId}/${eventId}`;
    return this.http.put<string>(url, null);
  }
  
}
