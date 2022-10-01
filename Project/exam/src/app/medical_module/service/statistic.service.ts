import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  getStatisticByMonth(starDay, endDay, type): Observable<HttpEvent<any>> {
    return this.http.get<any>(`http://localhost:8080/statistic/by-month/${starDay}/${endDay}/${type}`);
  }

  getStatisticByYear(starDay, endDay, type): Observable<HttpEvent<any>> {
    return this.http.get<any>(`http://localhost:8080/statistic/by-year/${starDay}/${endDay}/${type}`);
  }
}
