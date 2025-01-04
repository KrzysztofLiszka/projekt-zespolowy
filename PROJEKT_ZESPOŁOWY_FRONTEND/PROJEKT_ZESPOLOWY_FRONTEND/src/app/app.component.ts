import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthModule } from './core/modules/auth/auth.module';
import { SidebarComponent } from './core/shared/components/sidebar/sidebar.component';
import { TopbarComponent } from './core/shared/components/topbar/topbar.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, AuthModule, SidebarComponent, TopbarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'System zarządzania pracą';
    isLoggedIn: boolean = false;
    hasWorkplace: boolean = false;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.checkUserStatus();
            });

        this.checkUserStatus();
    }

    get userName(): string {
        if (typeof window !== 'undefined' && localStorage) {
            return localStorage.getItem("username") || "";
        }
        return "";
    }

    private checkUserStatus(): void {
        this.isLoggedIn = !!this.userName;

        if (this.isLoggedIn) {
            this.authService.checkIfIsInWorkplace().subscribe({
                next: (isInWorkplace) => {
                    this.hasWorkplace = isInWorkplace;
                },
                error: () => {
                    this.hasWorkplace = false;
                },
            });
        } else {
            this.hasWorkplace = false;
        }
    }
}
