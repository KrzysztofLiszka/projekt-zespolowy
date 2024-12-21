import { Component } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { TableComponent } from '../../../shared/components/table/table.component';

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

    constructor(private scheduleService: ScheduleService) { }

    ngOnInit(): void {
        this.subscribeSchedule();
    }

    private subscribeSchedule(): void {
        this.scheduleService.getAllItems().subscribe(res => { this.dataSource = res })
    }

    onAdd() {
        console.log('Add clicked');
    }

    onEdit(item: any) {
        console.log('Edit clicked', item);
    }

    onDelete(item: any) {
        console.log('Delete clicked', item);
    }
}
