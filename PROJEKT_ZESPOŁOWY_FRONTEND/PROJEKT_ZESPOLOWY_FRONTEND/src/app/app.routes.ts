import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/modules/auth/login-page/login-page.component';
import { RegisterPageComponent } from './core/modules/auth/register-page/register-page.component';
import { HomePageComponent } from './core/modules/home/home-page/home-page.component';
import { JoinOrCreateWorkplaceComponent } from './core/modules/workplace/join-or-create-workplace/join-or-create-workplace.component';
import { CoworkersPageComponent } from './core/modules/coworkers/coworkers-page/coworkers-page.component';
import { SchedulePageComponent } from './core/modules/schedule/schedule-page/schedule-page.component';
import { TimeSpentPageComponent } from './core/modules/time-spent/time-spent-page/time-spent-page.component';
import { DocumentationPageComponent } from './core/modules/documentation/components/documentation-page/documentation-page.component';
import { UsersPageComponent } from './core/modules/auth/users-page/users-page.component';
import { PaymentsComponent } from './core/modules/payments/components/payments/payments.component';
import { RolesPageComponent } from './core/modules/roles/roles-page/roles-page.component';
import { VisualizationsPageComponent } from './core/modules/visualizations/visualizations-page/visualizations-page.component';
import { VisualizationPageComponent } from './core/modules/visualizations/visualization-page/visualization-page.component';
import { DocumentationDetailsComponent } from './core/modules/documentation/components/documentation-details/documentation-details.component';
import { EnterToWorkplaceComponent } from './core/modules/workplace/enter-to-workplace/enter-to-workplace.component';
import { CreateWorkplaceFormComponent } from './core/modules/workplace/create-workplace-form/create-workplace-form.component';
import { BoardPageComponent } from './core/modules/assignments/containers/board-page/board-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'home', component: BoardPageComponent },
    { path: 'join-or-create-workplace', component: JoinOrCreateWorkplaceComponent },
    { path: 'coworkers', component: CoworkersPageComponent },
    { path: 'schedule', component: SchedulePageComponent },
    { path: 'time-spents', component: TimeSpentPageComponent },
    { path: 'documentations', component: DocumentationPageComponent },
    { path: 'documentations/:id', component: DocumentationDetailsComponent },
    { path: 'users', component: UsersPageComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'roles', component: RolesPageComponent },
    { path: 'visualizations', component: VisualizationsPageComponent },
    { path: 'visualizations/:id', component: VisualizationPageComponent },
    { path: 'enter-to-workplace', component: EnterToWorkplaceComponent },
    { path: 'create-workplace', component: CreateWorkplaceFormComponent }
];
