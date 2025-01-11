import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
    selector: 'app-topbar',
    imports: [],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private authService: AuthService
    ) { }

    openEditUserDialog(): void {
        // Fetch current user data from the backend
        this.authService.getCurrentUser().subscribe(
            (userData) => {
                const dialogRef = this.dialog.open(EditUserDialogComponent, {
                    width: '400px',
                    data: { user: userData }
                });

                dialogRef.afterClosed().subscribe((result) => {
                    if (result) {
                        console.log('User updated:', result);
                        localStorage.setItem('username', result.name + ' ' + result.surname);
                    }
                });
            },
            (error) => {
                console.error('Error fetching current user:', error);
            }
        );
    }

    logout(): void {
        localStorage.removeItem("tokenPZ");
        localStorage.removeItem("username");
        localStorage.removeItem("picture");
        localStorage.removeItem("rolename");
        this.router.navigateByUrl("/login");
    }
}
