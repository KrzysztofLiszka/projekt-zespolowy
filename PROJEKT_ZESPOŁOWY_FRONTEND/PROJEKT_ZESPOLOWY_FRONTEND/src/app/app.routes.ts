import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/modules/auth/login-page/login-page.component';
import { RegisterPageComponent } from './core/modules/auth/register-page/register-page.component';
import { HomePageComponent } from './core/modules/home/home-page/home-page.component';
import { JoinOrCreateWorkplaceComponent } from './core/modules/workplace/join-or-create-workplace/join-or-create-workplace.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'join-or-create-workplace', component: JoinOrCreateWorkplaceComponent }
];
