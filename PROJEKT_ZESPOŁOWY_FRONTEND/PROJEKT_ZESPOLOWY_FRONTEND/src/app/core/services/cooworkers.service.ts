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
}
