import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }




  getactiveUsers() : Observable<any>
  {
    return this.http.get("http://localhost:8082/activeUsers");
  }


  getChatLogs() : Observable<any>
  {
    return this.http.get("http://localhost:9000/api/notification/last24hoursnotifications");
  }
}
