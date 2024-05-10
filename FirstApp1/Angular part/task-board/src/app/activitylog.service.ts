import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ActivityLog {
  id?: number;
  cardId: number;
  actionName: string;
  details: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})

export class ActivitylogService {
  private apiUrl = 'http://localhost:5198/api/ActivityLog'; 
  activityLogged = new EventEmitter<ActivityLog>(); 
  constructor(private http: HttpClient) { }

  logActivity(activityLog: ActivityLog): Observable<ActivityLog> {
    return this.http.post<ActivityLog>(`${this.apiUrl}`, activityLog).pipe(
      tap(() => this.activityLogged.emit(activityLog))
    );
  }

  getActivitiesByCardId(cardId: number): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.apiUrl}?cardId=${cardId}`);
  }

  getAllActivities(limit: number = 20, offset: number = 0): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }
}
