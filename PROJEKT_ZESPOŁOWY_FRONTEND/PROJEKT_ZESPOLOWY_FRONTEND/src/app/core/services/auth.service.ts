import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {
  loginToSystem(loginData: any): Observable<any> {
    return this.post<any>('Auth/login', loginData);
  }

  registerToTheSystem(registerData: any): Observable<any> {
    return this.post<any>('Auth/register', registerData);
  }
}
