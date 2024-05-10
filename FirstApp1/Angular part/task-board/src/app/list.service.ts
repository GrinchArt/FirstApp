import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{List} from './list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiUrl = 'http://localhost:5198/api/Lists';
  constructor(private http: HttpClient) { }

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.apiUrl);
  }

  getListById(id: number): Observable<List> {
    return this.http.get<List>(`${this.apiUrl}/${id}`);
  }

  createList(listName:string): Observable<List> {
  const newList:List={
    id:0,
    name:listName,
    cards:[]
  };
    return this.http.post<List>(this.apiUrl, newList);
  }

  updateList(id:number,list:List): Observable<List> {
    return this.http.put<List>(`${this.apiUrl}/${id}`, list);
  }
  deleteList(id:number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
