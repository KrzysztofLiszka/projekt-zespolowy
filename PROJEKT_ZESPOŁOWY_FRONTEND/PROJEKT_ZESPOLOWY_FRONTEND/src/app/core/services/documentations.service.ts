import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentationsService extends BaseApiService {
    readonly CONTROLLER_NAME = "Documentations";

    getAllItems(): Observable<any[]> {
        return this.getAll<any>(`${this.CONTROLLER_NAME}`);
    }

    getItemById(id: string): Observable<any> {
        return this.get<any>(`${this.CONTROLLER_NAME}/${id}`);
    }

    addItem(item: any): Observable<any> {
        return this.post(`${this.CONTROLLER_NAME}/add`, item)
    }
    updateItem(item: any): Observable<any> {
        return this.put(`${this.CONTROLLER_NAME}/edit`, item)
    }
    deleteItem(id: string): Observable<any> {
        return this.delete(`${this.CONTROLLER_NAME}/${id}`)
    }
}
