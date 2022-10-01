import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Notifications} from '../model/notification';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const URL_NOTIFICATION = environment.apiUrl + '/api/v1/notification';


@Injectable({
  providedIn: 'root'
})


export class NotificationService {
  constructor(private http: HttpClient) {
  }

  getAllNotifications(page: number, contentSearch: string, size: number): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(URL_NOTIFICATION + '/page?page=' + page + '&content=' + contentSearch + '&size=' + size);
  }

  deleteNotifications(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = URL_NOTIFICATION + '/delete';
    return this.http.post<any>(url, data);
  }

  save(notifications): Observable<Notifications> {
    return this.http.post<Notifications>(URL_NOTIFICATION + '/create', notifications);
  }

  findById(id: number): Observable<Notifications> {
    return this.http.get<Notifications>(URL_NOTIFICATION + '/' + id);
  }

  update(id: number, notifications: Notifications): Observable<Notifications> {
    return this.http.put<Notifications>(URL_NOTIFICATION + '/update/' + id, notifications);
  }
}
