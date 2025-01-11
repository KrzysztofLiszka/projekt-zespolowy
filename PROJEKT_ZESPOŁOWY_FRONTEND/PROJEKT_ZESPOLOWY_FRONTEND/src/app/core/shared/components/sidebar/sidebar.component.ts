import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AddProfilePictureDialogComponent } from '../add-profile-picture-dialog/add-profile-picture-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isLoggedIn: boolean = false;
    userRole = localStorage.getItem('rolename');
    currentRoute: string = '';

    menuItems: any[] = [
        { text: "TABLICA", redirectTo: "home", iconClass: "fas fa-home fa-lg", rolesThatSeeSection: [Roles.SYSTEM_ADMIN, Roles.WORKER, Roles.WORKSPACE_OWNER] },
        { text: "WSPÓŁPRACOWNICY", redirectTo: "coworkers", iconClass: "fas fa-users fa-lg", rolesThatSeeSection: [Roles.SYSTEM_ADMIN, Roles.WORKER, Roles.WORKSPACE_OWNER] },
        { text: "HARMONOGRAM", redirectTo: "schedule", iconClass: "fas fa-calendar-check fa-lg", rolesThatSeeSection: [Roles.SYSTEM_ADMIN, Roles.WORKER, Roles.WORKSPACE_OWNER] },
        { text: "SPĘDZONY CZAS", redirectTo: "time-spents", iconClass: "fas fa-clock fa-lg", rolesThatSeeSection: [Roles.SYSTEM_ADMIN, Roles.WORKER, Roles.WORKSPACE_OWNER, Roles.ACCOUNTANT] },
        { text: "DOKUMENTACJE", redirectTo: "documentations", iconClass: "fas fa-file-alt fa-lg", rolesThatSeeSection: [Roles.SYSTEM_ADMIN, Roles.WORKER, Roles.WORKSPACE_OWNER] },
        { text: "WIZUALIZACJE", redirectTo: "visualizations", iconClass: "fas fa-chart-line fa-lg", rolesThatSeeSection: [Roles.SYSTEM_ADMIN, Roles.WORKER, Roles.WORKSPACE_OWNER] },
        { text: "ROLE", redirectTo: "roles", iconClass: "fas fa-cogs fa-lg", rolesThatSeeSection: [Roles.SYSTEM_ADMIN, Roles.WORKSPACE_OWNER] },
        { text: "UŻYTKOWNICY", redirectTo: "users", iconClass: "fas fa-user-cog fa-lg", rolesThatSeeSection: [Roles.SYSTEM_ADMIN] },
        { text: "WYPŁATY", redirectTo: "payments", iconClass: "fas fa-wallet fa-lg", rolesThatSeeSection: [Roles.SYSTEM_ADMIN, Roles.ACCOUNTANT, Roles.WORKSPACE_OWNER] },
    ];

    get filteredMenuItems(): any[] {
        return this.menuItems.filter(item => item.rolesThatSeeSection.includes(this.userRole));
    }


    get userName(): string {
        if (typeof window !== 'undefined' && localStorage) {
            return localStorage.getItem("username") || "";
        }
        return "";
    }

    get picture(): string | null {
        if (typeof window !== 'undefined' && localStorage) {
            const storedPicture = localStorage.getItem("picture");
            return storedPicture;
        }
        return null;
    }

    constructor(private router: Router, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.currentRoute = event.urlAfterRedirects;
                this.checkIfLoggedIn();
            });

        this.checkIfLoggedIn();
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
        return `data:image/jpg;base64,${byteFile}`;
    }

    openAddProfilePictureDialog(): void {
        this.dialog.open(AddProfilePictureDialogComponent, {
            width: '400px',
        });
    }
}

export enum Roles {
    SYSTEM_ADMIN = 'SystemAdmin',
    WORKSPACE_OWNER = 'WorkspaceOwner',
    ACCOUNTANT = 'Accountant',
    WORKER = 'Worker'
}