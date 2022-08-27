import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {Observable} from 'rxjs/dist/types';
import {CardMedical} from '../model/card-medical';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<CardMedical[]> {
    return this.http.get<CardMedical[]>('http://localhost:3000/cardMedical');
  }

}
