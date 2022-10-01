import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Advertisement} from '../model/advertisement';
import {environment} from '../../environments/environment';
import {Placement} from '../model/placement';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient) { }
  save(advertisement): Observable<Advertisement> {
    return this.http.post<Advertisement>(`${API_URL}/advertisement/post`, advertisement);
  }

  findById(id: number): Observable<Advertisement> {
    return this.http.get(`${API_URL}/advertisement/${id}`);
  }

  update(id: number, advertisement: Advertisement): Observable<Advertisement> {
    return this.http.put<Advertisement>(`${API_URL}/advertisement/edit/${id}`, advertisement);
  }
  getListPlacement(): Observable<Placement[]> {
    return this.http.get<Placement[]>(`${API_URL}/advertisement/list/placement`);
  }
  getListAndSearch(page: number, keySearch: string, size: number): Observable<any> {
    return this.http.get<any>(API_URL + '/advertisement/page?page=' + page + '&keySearch=' + keySearch + '&size=' + size);
  }

  deleteAdvertisement(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = API_URL + '/advertisement/delete';
    return this.http.post<any>(url, data);
  }
  checkDate(date: string): Observable<string> {
    return this.http.get<string>(API_URL + '/advertisement/date/' + date);
  }
  getListAdvertisement(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${API_URL}/advertisement/list`);
  }

}
