import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "./base-api.service";


@Injectable({
    providedIn: 'root'
})
export class ScheduleService extends BaseApiService {
    readonly CONTROLLER_NAME = "Worplaces";

    getAllItems(): Observable<any[]> {
        return this.getAll<any>(`${this.CONTROLLER_NAME}/schedule`);
    }
}
