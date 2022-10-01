import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pig} from '../model/pig';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PigService {
  constructor(private httpClient: HttpClient) {
  }

  createPig(pig: Pig): Observable<Pig> {
    return this.httpClient.post<Pig>(API_URL + '/create', pig);
  }

  findById(id: number): Observable<Pig> {
    return this.httpClient.get<Pig>(API_URL + '/list/' + id);
  }

  updatePig(pig: Pig): Observable<any> {
    return this.httpClient.put<any>(API_URL + '/update/' + pig.id, pig);
  }

  deletePig(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = API_URL + '/id';
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post<any>(url, data, options);
  }

  getAllPig(page: number, code: string, dateIn: string, status: string, size: number ) {
    return this.httpClient.get<any>(API_URL + '/page?page=' + page + '&codeSearch=' + code + '&dateInSearch=' + dateIn + '&statusSearch=' + status + '&size=' + size);
  }

  checkCode(code: string): Observable<string> {
    return this.httpClient.get<string>(API_URL + '/check/' + code);
  }
}
