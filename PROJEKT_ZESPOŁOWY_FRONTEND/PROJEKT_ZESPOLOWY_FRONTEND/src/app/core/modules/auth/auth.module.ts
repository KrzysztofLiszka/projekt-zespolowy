import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const COMPONENTS = [LoginPageComponent, RegisterPageComponent];


@NgModule({
    declarations: [COMPONENTS],
    imports: [
        CommonModule
    ],
    exports: [COMPONENTS]
})
export class AuthModule { }
