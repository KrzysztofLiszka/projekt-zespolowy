import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
    formGroup: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
        this.formGroup = this.fb.group({
            email: ["", Validators.email],
            login: [""],
            password: [""],
        });
    }

    goToLoginPage(): void {
        this.router.navigateByUrl("/login");
    }

    registerUser(): void {
    }
}
