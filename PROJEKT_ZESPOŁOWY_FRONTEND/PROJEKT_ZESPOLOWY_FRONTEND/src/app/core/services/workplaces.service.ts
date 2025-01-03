import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "./base-api.service";



@Injectable({
    providedIn: 'root'
})
export class WorkplacesService extends BaseApiService {
    readonly CONTROLLER_NAME = "Workplaces";

    getAllItems(): Observable<any[]> {
        return this.getAll<any>(`${this.CONTROLLER_NAME}`);
    }

    joinWorkplace(id: string): Observable<any> {
        return this.post(`${this.CONTROLLER_NAME}/join?workplaceUuid=${encodeURIComponent(id)}`, null);
    }

    addNewWorkplace(workplace: any): Observable<any> {
        return this.post(`${this.CONTROLLER_NAME}/add`, workplace);
    }
}