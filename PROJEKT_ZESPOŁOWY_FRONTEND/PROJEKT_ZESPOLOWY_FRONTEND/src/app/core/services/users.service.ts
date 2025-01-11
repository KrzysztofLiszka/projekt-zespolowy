import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class UsersService extends BaseApiService {
    readonly CONTROLLER_NAME = "Users";

    getAllItems(): Observable<any[]> {
        return this.getAll<any>(`${this.CONTROLLER_NAME}`);
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