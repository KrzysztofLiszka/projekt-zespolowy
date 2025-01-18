import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../services/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
    selector: 'app-users-page',
    imports: [TableComponent],
    templateUrl: './users-page.component.html',
    styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {
    displayedColumns: string[] = ['email', 'name', 'surname', 'roleName', 'hourlyRate', 'actions'];
    displayedHeaders: string[] = ['Email', 'Imię', 'Nazwisko', 'Rola', 'Stawka Godzinowa', 'Akcja'];
    dataSource: any[] = [];
    subscription = new Subscription();

    roleMap: { [key: string]: string } = {
        SystemAdmin: "Admin systemu",
        WorkspaceOwner: "Właściciel firmy",
        Accountant: "Księgowość",
        Worker: "Członek projektu"
    };

    constructor(
        private authService: AuthService,
        private notificationService: NotificationsService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.subscribeUserse();
    }

    private subscribeUserse(): void {
        this.authService.getAllItems().subscribe((res) => {
            this.dataSource = res.map(user => ({
                ...user,
                roleName: this.roleMap[user.roleName] || user.roleName
            }));
        });
    }

    onAdd() {
        console.log('Add clicked');
    }

    onEdit(item: any) {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            width: '400px',
            data: { user: item, isEdit: true },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.authService.updateExternalUser(result).subscribe(
                    response => {
                        this.subscribeUserse();
                    },
                    error => {
                        console.error('Błąd podczas aktualizacji elementu:', error);
                    }
                );
            }
        });
    }

    onDelete(item: any) {
        this.subscription.add(
            this.authService.deleteUser(item.uuid).subscribe(() => {
                this.subscribeUserse();
            })
        );
    }
}

