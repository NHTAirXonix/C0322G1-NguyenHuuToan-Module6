import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {Observable} from 'rxjs/dist/types';

import {MedicalRecord} from '../model/medical-record';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  constructor(private http: HttpClient) {
  }

  findById(id: number): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`http://localhost:8080/people/findById/${id}`);
  }

  getAll(): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>('http://localhost:8080/people/list');
  }

  create(id: number, medicalRecord: MedicalRecord): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(`http://localhost:8080/people/create/${id}`, medicalRecord);
  }

  update(id: number, medicalRecord: MedicalRecord): Observable<MedicalRecord> {
    return this.http.put<MedicalRecord>(`http://localhost:8080/people/update/${id}`, medicalRecord);
  }

  delete(id: number): Observable<MedicalRecord> {
    return this.http.delete<MedicalRecord>(`http://localhost:8080/people/remove/${id}`);
  }

  search(name): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`http://localhost:8080/people/search/${name}`);
  }

  getChart(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/people/getChart`);
  }
}


