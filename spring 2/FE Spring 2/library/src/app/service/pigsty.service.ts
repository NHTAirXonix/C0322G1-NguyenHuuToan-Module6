import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pigsty} from '../model/pigsty';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PigstyService {
  private URL_PIGSTY = environment.apiUrl + '/pigsty';

  constructor(private http: HttpClient) {
  }

  createPigsty(pigsty: Pigsty): Observable<Pigsty> {
    return this.http.post(this.URL_PIGSTY + '/createPigsty', pigsty);
  }

  editPigsty(pigsty: Pigsty): Observable<Pigsty> {
    return this.http.patch(this.URL_PIGSTY + '/editPigsty', pigsty);
  }

  getPigsty(id: number): Observable<Pigsty> {
    return this.http.get<Pigsty>(this.URL_PIGSTY + '/getPigstyById' + `/${id}`);
  }

  getAll(page: number, search: string, pageSize: number): Observable<any> {
    return this.http.get<any>(this.URL_PIGSTY + '/list?search=' + search + '&page=' + page + '&size=' + pageSize);
  }

  getAllList(): Observable<any> {
    return this.http.get<any>(this.URL_PIGSTY + '/getList');
  }

  getAllPigsty(): Observable<Pigsty[]> {
    return this.http.get<Pigsty[]>(API_URL + '/list/pigsty');
  }

  checkCode(code: string): Observable<string> {
    return this.http.get<string>(this.URL_PIGSTY + '/checkCode/' + code);
  }
}
