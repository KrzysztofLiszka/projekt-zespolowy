import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnDestroy {
    formGroup!: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(private fb: FormBuilder, private router: Router) {
        this.formGroup = this.fb.group({
            email: ["", Validators.email],
            password: [""],
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    login(): void {
        /*
        this.subscription.add(this.authService.loginToSystem(this.formGroup.value as LoginDto).subscribe(res => {
            localStorage.setItem('tokenPracaInz', res.token);
            localStorage.setItem('currentUser', JSON.stringify(res.user as WorkerDto));
            this.router.navigateByUrl("/board").then(() => {
                window.location.reload();
            });
        }));*/
    }

    goToRegisterPage(): void {
        this.router.navigateByUrl("/register");
    }

}
