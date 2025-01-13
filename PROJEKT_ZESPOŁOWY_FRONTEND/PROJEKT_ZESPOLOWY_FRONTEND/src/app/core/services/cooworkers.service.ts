import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CooworkersService extends BaseApiService {
    readonly CONTROLLER_NAME = "Workplaces";

    getAllItems(): Observable<any[]> {
        return this.getAll<any>(`${this.CONTROLLER_NAME}/coworkers`);
    }

    getWorkersToAssignment(): Observable<any[]> {
        return this.getAll<any>(`${this.CONTROLLER_NAME}/workersToAssignment`);
    }

    getSalaries(from: Date | null, to: Date | null): Observable<any[]> {
        if (!from || !to) return this.getPaymentsFromTimeline<any>();
        return this.getPaymentsFromTimeline<any>(from.toDateString(), to.toDateString());
    }
}
