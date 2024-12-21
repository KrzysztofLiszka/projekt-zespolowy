import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isLoggedIn: boolean = false;
    currentRoute: string = '';

    get userName(): string {
        if (typeof window !== 'undefined' && localStorage) {
            return localStorage.getItem("username") || "";
        }
        return "";
    }

    get picture(): string | null {
        if (typeof window !== 'undefined' && localStorage) {
            return localStorage.getItem("picture") || "";
        }
        return null;
    }

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.currentRoute = event.urlAfterRedirects;
                this.checkIfLoggedIn();
            });

        this.checkIfLoggedIn();
    }

    klik(): void {
        console.log(this.picture)
    }

    private checkIfLoggedIn(): void {
        this.isLoggedIn = !!this.userName;
    }

    isActiveRoute(route: string): boolean {
        return this.currentRoute.includes(route);
    }

    navigateTo(route: string): void {
        this.router.navigate([`/${route}`]);
    }

    getBase64Data(byteFile?: any): any | null {
        if (!byteFile || byteFile == "") '../../../../assets/template-user-photo.jpg';
        return `data:image/jpg;base64,${byteFile}`;
    }
}
