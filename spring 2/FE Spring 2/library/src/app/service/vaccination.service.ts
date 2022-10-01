import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vaccination} from '../model/vaccination';
import {Pigsty} from '../model/pigsty';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class VaccinationService {
  constructor(private http: HttpClient) {
  }

  saveVaccination(vaccination): Observable<Vaccination> {
    return this.http.post<Vaccination>(API_URL + '/api/vaccination/create', vaccination);
  }

  findAll(page: number, name: string, pageSize: number): Observable<any> {
    return this.http.get<any>(API_URL + '/api/vaccination/list?page=' + page + '&name=' + name + '&size=' + pageSize);
  }
  deleteVaccination(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = API_URL + '/api/vaccination/delete';
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(url, data, options);
  }

  getAll(): Observable<Pigsty[]> {
    return this.http.get<Pigsty[]>(API_URL + '/pigsty/getList');
  }

  findById(id: number): Observable<Pigsty> {
    return this.http.get<Pigsty>(`${API_URL}/pigsty/${id}`);
  }
}
