import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../model/contact';
import {environment} from '../../environments/environment';

const URL_CONTACT = `${environment.apiUrl + '/api/contact'}`;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  getAllContact(page: number, nameSearch: string, pageSize: number): Observable<any> {
    return this.httpClient.get<any>(URL_CONTACT + '/page?page=' + page + '&nameSearch=' + nameSearch + '&size=' + pageSize);
  }

  getContactById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(URL_CONTACT + `/${id}`);
  }

  deleteContact(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = URL_CONTACT + '/delete';
    return this.httpClient.post<any>(url, data);
  }

  search(content: any): Observable<Contact[]> {
    const contentSearch: string = content.content;
    return this.httpClient.get<Contact[]>(URL_CONTACT + '/page?nameSearch=' + contentSearch);
  }

  save(contact: Contact): Observable<Contact> {
    return this.httpClient.post(URL_CONTACT + '/create', contact);
  }

}
