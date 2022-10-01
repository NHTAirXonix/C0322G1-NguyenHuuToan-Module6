import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Food} from '../model/food';

const URL_API = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(pageable: number, searchType: string, sort: string, size: string): Observable<any> {
    return this.httpClient.get<any>(URL_API + '/api/food/list?page=' +
      pageable + '&foodType=' + searchType + '&sort=' + sort + '&size=' + size);
  }

  saveFood(food: Food): Observable<Food> {
    return this.httpClient.post<Food>(URL_API + '/api/food/create', food);
  }

  findById(id: number): Observable<Food> {
    return this.httpClient.get<Food>(URL_API + `/api/food/show/${id}`);
  }

  editFood(id: number, food: Food): Observable<Food> {
    return this.httpClient.put<Food>(URL_API + `/api/food/${id}`, food);
  }
}
