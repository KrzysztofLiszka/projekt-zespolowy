import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {
  readonly CONTROLLER_NAME = "Auth"
  loginToSystem(loginData: any): Observable<any> {
    return this.post<any>('Auth/login', loginData);
  }

  registerToTheSystem(registerData: any): Observable<any> {
    return this.post<any>('Auth/register', registerData);
  }

  getAllItems(): Observable<any[]> {
    return this.getAll<any>(`${this.CONTROLLER_NAME}/all-users`);
  }
}
