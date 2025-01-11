import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { DocumentationsService } from '../../../../services/documentations.service';
import { AddOrEditDocumentationDialogComponent } from '../add-or-edit-documentation-dialog/add-or-edit-documentation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../../services/notifications.service';

@Component({
    selector: 'app-documentation-page',
    imports: [TableComponent],
    templateUrl: './documentation-page.component.html',
    styleUrl: './documentation-page.component.scss'
})
export class DocumentationPageComponent implements OnInit {
    displayedColumns: string[] = ['name', 'createdAt', 'lastUpdatedAt', 'actions'];
    displayedHeaders: string[] = ['Nazwa', 'Data dodania', 'Aktualizacja', 'Akcja'];
    dataSource: any[] = [];
    subscription = new Subscription();

    constructor(
        private documentationsService: DocumentationsService,
        private dialog: MatDialog, private notificationsService: NotificationsService
    ) { }

    ngOnInit(): void {
        this.subscribeDocumentations();
    }

    private subscribeDocumentations(): void {
        this.documentationsService.getAllItems().subscribe(res => { this.dataSource = res })
    }

    onAdd(): void {
        const dialogRef = this.dialog.open(AddOrEditDocumentationDialogComponent, {
            data: { documentation: {}, isEdit: false },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.documentationsService.addItem(result).subscribe(() => {
                    this.subscribeDocumentations();
                });
            }
        });
    }

    onEdit(item: any): void {
        const dialogRef = this.dialog.open(AddOrEditDocumentationDialogComponent, {
            data: { documentation: item, isEdit: true },
        });
        console.log(item);
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.documentationsService.updateItem(result).subscribe(() => {
                    this.subscribeDocumentations();
                });
            }
        });
    }
    onDelete(item: any) {
        this.subscription.add(
            this.documentationsService.deleteItem(item.uuid).subscribe(() => {
                this.subscribeDocumentations();
            })
        );
    }
}
