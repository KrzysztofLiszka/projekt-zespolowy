import { Component } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { TableComponent } from '../../../shared/components/table/table.component';
import { EditOrAddScheduleComponent } from '../edit-or-add-schedule/edit-or-add-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-schedule-page',
    imports: [TableComponent, CommonModule],
    templateUrl: './schedule-page.component.html',
    styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent {

    displayedColumns: string[] = ['name', 'date', 'hour', 'actions'];
    displayedHeaders: string[] = ['Nazwa', 'Data', 'Godzina', 'Akcje'];
    dataSource: any[] = [];
    subscription = new Subscription();
    constructor(private scheduleService: ScheduleService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.subscribeSchedule();
    }

    private subscribeSchedule(): void {
        this.scheduleService.getAllItems().subscribe(res => { this.dataSource = res })
    }


    onAdd(): void {
        const dialogRef = this.dialog.open(EditOrAddScheduleComponent, {
            width: '400px',
            data: { schedule: null, isEdit: false },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.scheduleService.addItem(result).subscribe(
                    response => {
                        this.subscribeSchedule();
                    },
                    error => {
                        console.error('Błąd podczas dodawania elementu:', error);
                    }
                );
            }
        });
    }

    onEdit(item: any): void {
        const dialogRef = this.dialog.open(EditOrAddScheduleComponent, {
            width: '400px',
            data: { schedule: item, isEdit: true },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.scheduleService.updateItem(result).subscribe(
                    response => {
                        this.subscribeSchedule();
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
            this.scheduleService.deleteItem(item.uuid).subscribe(() => {
                this.subscribeSchedule();
            })
        );
    }

    pageNumber: number = 1;
    pageSize: number = 1;
    totalPages: number = 1;
}
