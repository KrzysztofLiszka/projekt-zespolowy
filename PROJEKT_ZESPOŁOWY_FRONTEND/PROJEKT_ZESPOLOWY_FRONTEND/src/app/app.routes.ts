import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/modules/auth/login-page/login-page.component';
import { RegisterPageComponent } from './core/modules/auth/register-page/register-page.component';
import { HomePageComponent } from './core/modules/home/home-page/home-page.component';
import { JoinOrCreateWorkplaceComponent } from './core/modules/workplace/join-or-create-workplace/join-or-create-workplace.component';
import { CoworkersPageComponent } from './core/modules/coworkers/coworkers-page/coworkers-page.component';
import { SchedulePageComponent } from './core/modules/schedule/schedule-page/schedule-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'join-or-create-workplace', component: JoinOrCreateWorkplaceComponent },
    { path: 'coworkers', component: CoworkersPageComponent },
    { path: 'schedule', component: SchedulePageComponent }
];
