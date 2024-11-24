import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/modules/auth/login-page/login-page.component';
import { RegisterPageComponent } from './core/modules/auth/register-page/register-page.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
];
