import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {Observable} from 'rxjs/dist/types';

import {People} from '../model/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) {
  }

  findById(id: number): Observable<People> {
    return this.http.get<People>(`http://localhost:3000/people/${id}`);
  }

  getAll(): Observable<People[]> {
    return this.http.get<People[]>('http://localhost:3000/people');
  }

  save(people: any): Observable<People> {
    return this.http.post<People>('http://localhost:3000/people', people);
  }

  update(id: number, people: People): Observable<People> {
    return this.http.put<People>(`http://localhost:3000/people/${id}`, people);
  }

  delete(id: number): Observable<People> {
    return this.http.delete<People>(`http://localhost:3000/people/${id}`);
  }

  search(name, type): Observable<People[]> {
    return this.http.get<People[]>('http://localhost:3000/people/?name_like=' + name + '&customerTypeI.id_like=' + type);
  }
}


