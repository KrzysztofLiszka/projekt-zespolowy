import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, tap } from 'rxjs';

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

    updateUserProfilePicture(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.post<any>('Auth/UpdateUserProfilePicture', formData);
    }
    updateUser(updatedUser: any): Observable<any> {
        return this.post<any>('Auth/UpdateUser', updatedUser);
    }

    getCurrentUser(): Observable<any> {
        return this.get<any>('Auth/current-user');
    }

    checkIfIsInWorkplace(): Observable<any> {
        return this.get<any>('Auth/CheckIfIsInWorkplace')
    }

    getUserProfilePicture(userId: string): Observable<any> {
        return this.get<any>(`Auth/GetUserProfilePicture/${userId}`);
    }

    deleteUser(userId: string): Observable<any> {
        return this.delete<any>(`Auth/${userId}`).pipe(
            tap(() => this.notificationsService.showTypicalSuccessNotification())
        );
    }

    updateExternalUser(updatedUser: any): Observable<any> {
        return this.post<any>('Auth/UpdateExternalUser', updatedUser).pipe(
            tap(() => this.notificationsService.showTypicalSuccessNotification())
        );
    }
}


