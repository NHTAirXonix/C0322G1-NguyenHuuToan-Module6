import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Treatment} from '../model/treatment';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private http: HttpClient) {
  }

  getAll(page: number, name: string, pageSize: number): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(API_URL + `/api/treatment/v1/?keySearch=` + name + `&page=` + page + `&size=` + pageSize);
  }

  deleteTreatment(id: number): Observable<Treatment> {
    // @ts-ignore
    return this.http.put<Treatment>(API_URL + `/api/treatment/v1/` + id);
  }

  save(saving: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(API_URL + `/api/treatment/v1/create`, saving);
  }

  getListPig(id: number): Observable<any> {
    // @ts-ignore
    return this.http.put<any>(API_URL + `/api/treatment/v1/getListPig/` + id);
  }

  getListPigsty(): Observable<any> {
    return this.http.get<any>(API_URL + `/api/treatment/v1/getListPigsty`);
  }
}
