import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { BaseApiService } from "./base-api.service";


@Injectable({
    providedIn: 'root'
})
export class ScheduleService extends BaseApiService {
    readonly CONTROLLER_NAME = "Schedules";

    getAllItems(): Observable<any[]> {
        return this.getAll<any>(`${this.CONTROLLER_NAME}`);
    }

    addItem(item: any): Observable<any> {
        return this.post(`${this.CONTROLLER_NAME}/add`, item).pipe(
            tap(() => this.notificationsService.showTypicalSuccessNotification())
        );
    }

    updateItem(item: any): Observable<any> {
        return this.put(`${this.CONTROLLER_NAME}/edit`, item).pipe(
            tap(() => this.notificationsService.showTypicalSuccessNotification())
        );
    }

    deleteItem(id: string): Observable<any> {
        return this.delete(`${this.CONTROLLER_NAME}/${id}`).pipe(
            tap(() => this.notificationsService.showTypicalSuccessNotification())
        );
    }
}
