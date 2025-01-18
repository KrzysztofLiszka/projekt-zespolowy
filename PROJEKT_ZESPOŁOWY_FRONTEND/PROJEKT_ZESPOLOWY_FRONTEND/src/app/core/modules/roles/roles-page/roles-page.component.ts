import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-roles-page',
    imports: [TableComponent],
    templateUrl: './roles-page.component.html',
    styleUrl: './roles-page.component.scss'
})
export class RolesPageComponent {
    displayedColumns: string[] = ['name'];
    displayedHeaders: string[] = ['Nazwa roli'];
    dataSource: any[] = [{ name: "Admin systemu" }, { name: "Właściciel firmy" }, { name: "Członek projektu" }, { name: "Księgowy" }];
}
