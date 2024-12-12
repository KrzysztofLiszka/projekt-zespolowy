import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthModule } from './core/modules/auth/auth.module';
import { SidebarComponent } from './core/shared/components/sidebar/sidebar.component';
import { TopbarComponent } from './core/shared/components/topbar/topbar.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, AuthModule, SidebarComponent, TopbarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'System zarządzania pracą';
    isLoggedIn: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.checkIfLoggedIn();
            });

        this.checkIfLoggedIn();
    }

    checkIfLoggedIn(): void {
        this.isLoggedIn = this.router.url.startsWith('/home') || this.router.url.startsWith('/dashboard') || this.router.url.endsWith('/coworkers');
    }
}
