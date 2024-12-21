import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { TimeSpentsService } from '../../../services/time-spents.service';

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

    constructor(private timeSpentsService: TimeSpentsService) { }

    ngOnInit(): void {
        this.subscribeTimeSpents();
    }

    private subscribeTimeSpents(): void {
        this.timeSpentsService.getAllItems().subscribe(res => { this.dataSource = res })
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
