import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.scss',
    standalone: false
})
export class RegisterPageComponent {
    formGroup: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.formGroup = this.fb.group({
            email: ["", Validators.email],
            name: [""],
            surname: [""],
            password: [""],
        });
    }

    goToLoginPage(): void {
        this.router.navigateByUrl("/login");
    }

    registerUser(): void {
        this.authService.registerToTheSystem(this.formGroup.value as any).subscribe(response => {
            this.router.navigateByUrl("/login");
        });
    }
}
