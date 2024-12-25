import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { TimeSpentsService } from '../../../services/time-spents.service';
import { EditOrAddTimeSpentComponent } from '../edit-or-add-time-spent/edit-or-add-time-spent.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-time-spent-page',
    imports: [TableComponent],
    templateUrl: './time-spent-page.component.html',
    styleUrls: ['./time-spent-page.component.scss']
})
export class TimeSpentPageComponent {
    displayedColumns: string[] = ['spentHours', 'date', 'actions'];
    displayedHeaders: string[] = ['Spędzony czas', 'Data', 'Akcje'];
    dataSource: any[] = [];
    subscription = new Subscription();

    constructor(private timeSpentsService: TimeSpentsService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.subscribeTimeSpents();
    }

    private subscribeTimeSpents(): void {
        this.timeSpentsService.getAllItems().subscribe(res => {
            this.dataSource = res;
        });
    }

    onAdd(): void {
        const dialogRef = this.dialog.open(EditOrAddTimeSpentComponent, {
            width: '400px',
            data: { timeSpent: null, isEdit: false },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.timeSpentsService.addItem(result).subscribe(
                    response => {
                        this.subscribeTimeSpents();
                    },
                    error => {
                        console.error('Błąd podczas dodawania elementu:', error);
                    }
                );
            }
        });
    }


    onEdit(item: any): void {
        const dialogRef = this.dialog.open(EditOrAddTimeSpentComponent, {
            width: '400px',
            data: { timeSpent: item, isEdit: true },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.timeSpentsService.updateItem(result).subscribe(
                    response => {
                        this.subscribeTimeSpents();
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
            this.timeSpentsService.deleteItem(item.uuid).subscribe(() => {
                this.subscribeTimeSpents();
            })
        );
    }
}
