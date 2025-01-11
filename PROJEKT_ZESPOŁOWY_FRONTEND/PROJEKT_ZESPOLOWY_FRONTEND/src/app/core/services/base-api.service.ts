import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
    providedIn: 'root'
})
export class BaseApiService {

    private readonly apiUrl = 'https://localhost:44331/api';

    constructor(private httpClient: HttpClient, protected notificationsService: NotificationsService) { }

    protected get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(`${this.apiUrl}/${url}`);
    }

    protected getAll<T>(url: string): Observable<T[]> {
        return this.httpClient.get<T[]>(`${this.apiUrl}/${url}`);
    }

    protected post<T>(url: string, data: any): Observable<T> {
        return this.httpClient.post<T>(`${this.apiUrl}/${url}`, data);
    }

    protected put<T>(url: string, data: any): Observable<T> {
        return this.httpClient.put<T>(`${this.apiUrl}/${url}`, data);
    }

    protected delete<T>(url: string): Observable<T> {
        return this.httpClient.delete<T>(`${this.apiUrl}/${url}`);
    }
}
