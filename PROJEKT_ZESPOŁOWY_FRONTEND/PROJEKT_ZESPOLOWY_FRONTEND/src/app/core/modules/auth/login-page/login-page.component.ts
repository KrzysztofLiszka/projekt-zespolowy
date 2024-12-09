import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnDestroy {
    formGroup!: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {
        this.formGroup = this.fb.group({
            email: ["", Validators.email],
            password: [""],
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    login(): void {
        this.subscription.add(this.authService.loginToSystem(this.formGroup.value).subscribe(res => {
            localStorage.setItem('tokenPZ', res.token);
            this.router.navigateByUrl("/home").then(() => {
                window.location.reload();
            });
        }));
    }

    goToRegisterPage(): void {
        this.router.navigateByUrl("/register");
    }

}
