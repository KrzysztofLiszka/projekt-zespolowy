import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    standalone: false
})
export class LoginPageComponent implements OnDestroy {
    formGroup!: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
        this.formGroup = this.fb.group({
            email: ["", Validators.email],
            password: [""],
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    login(): void {
        this.subscription.add(
            this.authService.loginToSystem(this.formGroup.value).subscribe({
                next: (res) => {
                    localStorage.setItem('tokenPZ', res.token);
                    localStorage.setItem('username', res.username);
                    console.log(res);
                    if (res.picture !== null) {
                        localStorage.setItem('picture', res.picture);
                    }

                    this.authService.checkIfIsInWorkplace().subscribe({
                        next: (isInWorkplace) => {
                            const targetRoute = isInWorkplace ? '/home' : '/join-or-create-workplace';
                            this.router.navigateByUrl(targetRoute).then(() => {
                                window.location.reload();
                            });
                        },
                        error: () => {
                            this.snackBar.open('Nie udało się sprawdzić statusu zespołu!', 'BŁĄD', {
                                duration: 3000,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                                panelClass: ['custom-snackbar'],
                            });
                        },
                    });
                },
                error: () => {
                    this.snackBar.open('Nieprawidłowy login lub hasło!', 'BŁĄD', {
                        duration: 3000, // czas trwania w ms
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        panelClass: ['custom-snackbar'],
                    });
                },
            })
        );
    }


    goToRegisterPage(): void {
        this.router.navigateByUrl("/register");
    }

}
