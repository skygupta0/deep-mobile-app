import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {
    private baseUrl = 'http://localhost:5000/api';
constructor(private http: HttpClient) {}

  submitQuery(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/queries`, data);
  }
    getAllQueries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_queries`);
  }
}
