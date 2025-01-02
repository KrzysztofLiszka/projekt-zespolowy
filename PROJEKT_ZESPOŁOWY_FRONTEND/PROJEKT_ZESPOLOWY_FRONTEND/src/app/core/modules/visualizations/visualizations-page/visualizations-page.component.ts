import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { Subscription } from 'rxjs';
import { VisualizationsService } from '../../../services/visualizations.service';

@Component({
    selector: 'app-visualizations-page',
    imports: [TableComponent],
    templateUrl: './visualizations-page.component.html',
    styleUrl: './visualizations-page.component.scss'
})
export class VisualizationsPageComponent implements OnInit {

    displayedColumns: string[] = ['name', 'actions'];
    displayedHeaders: string[] = ['Nazwa', 'Akcje'];
    dataSource: any[] = [];
    subscription = new Subscription();

    constructor(private visualizationsService: VisualizationsService) { }

    ngOnInit(): void {
        this.subscribeVisualizations();
    }

    private subscribeVisualizations(): void {
        this.visualizationsService.getAllItems().subscribe(res => {
            this.dataSource = res;
        });
    }

    onAdd(): void {
        this.visualizationsService.addItem().subscribe(
            response => {
                this.subscribeVisualizations();
            },
            error => {
                console.error('Błąd podczas dodawania elementu:', error);
            }
        );
    }


    onDelete(item: any) {
        this.subscription.add(
            this.visualizationsService.deleteItem(item.uuid).subscribe(() => {
                this.subscribeVisualizations();
            })
        );
    }
}
