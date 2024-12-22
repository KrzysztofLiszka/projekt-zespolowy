import { Component } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { TableComponent } from '../../../shared/components/table/table.component';
import { EditOrAddScheduleComponent } from '../edit-or-add-schedule/edit-or-add-schedule.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-schedule-page',
    imports: [TableComponent],
    templateUrl: './schedule-page.component.html',
    styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent {

    displayedColumns: string[] = ['name', 'date', 'hour'];
    displayedHeaders: string[] = ['Nazwa', 'Data', 'Godzina'];
    dataSource: any[] = [];

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
            data: { schedule: {}, isEdit: false },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log('dodaj');
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
                console.log('update');
            }
        });
    }

    onDelete(item: any) {
        console.log('Delete clicked', item);
    }
}
