import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KanbanItem } from '../interfaces/kanban.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private baseUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  

  getItems(): Observable<KanbanItem[]> {
    return this.http.get<KanbanItem[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  saveItems(items: KanbanItem[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/bulk`, { items }, { headers: this.getAuthHeaders() });
  }

  
  updateItem(id: string, item: Partial<KanbanItem>): Observable<KanbanItem> {
    return this.http.put<KanbanItem>(`${this.baseUrl}/${id}`, item, { headers: this.getAuthHeaders() });
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
