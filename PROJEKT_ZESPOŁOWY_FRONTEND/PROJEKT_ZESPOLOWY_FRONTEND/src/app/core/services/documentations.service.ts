import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentationsService extends BaseApiService {
  readonly CONTROLLER_NAME = "Workplaces";

  getAllItems(): Observable<any[]> {
    return this.getAll<any>(`${this.CONTROLLER_NAME}`);
  }
}
