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
    currentRoute: string = '';

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

    klik(): void {
        console.log('Picture:', this.picture);  // Debug log to check the picture
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
        return byteFile ? `data:image/jpg;base64,${byteFile}` : null;
    }

    openAddProfilePictureDialog(): void {
        this.dialog.open(AddProfilePictureDialogComponent, {
            width: '400px',
        });
    }
}
