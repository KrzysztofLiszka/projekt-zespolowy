import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [LoginPageComponent, RegisterPageComponent];

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [COMPONENTS],
})
export class AuthModule { }
