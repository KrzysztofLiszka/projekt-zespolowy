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
    styleUrl: './time-spent-page.component.scss'
})
export class TimeSpentPageComponent {
    displayedColumns: string[] = ['spentHours', 'date'];
    displayedHeaders: string[] = ['Spędzony czas', 'Data'];
    dataSource: any[] = [];
    subscription = new Subscription();
    constructor(private timeSpentsService: TimeSpentsService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.subscribeTimeSpents();
    }

    private subscribeTimeSpents(): void {
        this.timeSpentsService.getAllItems().subscribe(res => { this.dataSource = res })
    }


    onAdd(): void {
        const dialogRef = this.dialog.open(EditOrAddTimeSpentComponent, {
            width: '400px',
            data: { schedule: {}, isEdit: false },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log('dodaj');
            }
        });
    }

    onEdit(item: any): void {
        console.log(item);
        const dialogRef = this.dialog.open(EditOrAddTimeSpentComponent, {
            width: '400px',
            data: { timeSpent: item, isEdit: true },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result);
                this.timeSpentsService.updateItem(result).subscribe(
                    response => {
                        console.log('Item updated successfully:', response);
                        // Możesz dodać logikę, np. zamknięcie dialogu po pomyślnym zaktualizowaniu
                    },
                    error => {
                        console.error('Error updating item:', error);
                        // Możesz dodać logikę obsługi błędu, np. wyświetlenie komunikatu o błędzie
                    }
                );
            }
        });
    }


    onDelete(item: any) {
        console.log('Delete clicked', item);
    }
}
