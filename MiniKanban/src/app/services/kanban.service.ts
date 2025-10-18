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

  
  getItems(): Observable<KanbanItem[]> {
    return this.http.get<KanbanItem[]>(this.baseUrl);
  }

  saveItems(items: KanbanItem[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/bulk`, { items });
  }

  
  updateItem(id: string, item: Partial<KanbanItem>): Observable<KanbanItem> {
    return this.http.put<KanbanItem>(`${this.baseUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
