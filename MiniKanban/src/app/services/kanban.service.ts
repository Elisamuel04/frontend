import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KanbanItem } from '../interfaces/kanban.interface';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private baseUrl = 'http://localhost:3000/tasks'; // tu backend Express

  constructor(private http: HttpClient) {}

  saveItems(items: KanbanItem[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/bulk`, { items });
  }
}
