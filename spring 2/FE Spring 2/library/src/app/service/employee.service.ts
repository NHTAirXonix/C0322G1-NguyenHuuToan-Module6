import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/employee';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_URL + '/employee/create', employee);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/employee/${id}`);
  }

  editEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/employee/edit/${id}`, employee);
  }

  getAllEmployee(): Observable<any> {
    return this.http.get<any>(API_URL + '/employee/list');
  }


  deleteEmployee(id: number): Observable<any> {
    // @ts-ignore
    return this.http.patch<any>(API_URL + '/employee/delete/' + id);
  }

  getListEmployeeBySearchAndPagination(name: string, idCard: string, indexPagination: number, size: number): Observable<any> {
    return this.http.get<any>(API_URL + '/employee/searchList?name=' + name + '&idCard=' + idCard +
      '&page=' + indexPagination + '&size=' + size);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/employee/detail/' + id);
  }

  checkCode(code: string): Observable<string> {
    return this.http.get<string>(API_URL + '/employee/checkCode/' + code);
  }

  checkIdCard(idCard: string): Observable<string> {
    return this.http.get<string>(API_URL + '/employee/checkIdCard/' + idCard);
  }

  checkUsername(username: string): Observable<string> {
    return this.http.get<string>(API_URL + '/employee/checkUsername/' + username);
  }

  checkEmail(email: string): Observable<string> {
    return this.http.get<string>(API_URL + '/employee/checkEmail/' + email);
  }

  finByUser(user: string): Observable<Employee> {
    return this.http.get<Employee>(API_URL + '/employee/findUser/' + user);
  }
}
