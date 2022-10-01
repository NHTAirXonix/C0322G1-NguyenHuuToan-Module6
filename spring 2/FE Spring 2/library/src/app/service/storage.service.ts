import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) {
  }

  getAll(page: number, foodTypeSearch: string, size: number): Observable<Storage[]> {
    return this.http.get<Storage[]>(API_URL + '/storage/page?page=' + page + '&keyWord=' + foodTypeSearch + '&size=' + size);
  }

  getAllS(): Observable<Storage[]> {
    return this.http.get<Storage[]>(API_URL + '/storage/list');
  }

  saveStorage(storage): Observable<Storage> {
    return this.http.post<Storage>(`${API_URL}/storage/create`, storage);
  }
}
