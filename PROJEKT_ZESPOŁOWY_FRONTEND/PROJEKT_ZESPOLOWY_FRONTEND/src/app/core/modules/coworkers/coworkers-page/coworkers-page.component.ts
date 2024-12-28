import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { CooworkersService } from '../../../services/cooworkers.service';

@Component({
    selector: 'app-coworkers-page',
    templateUrl: './coworkers-page.component.html',
    styleUrls: ['./coworkers-page.component.scss'],
    standalone: true,
    imports: [TableComponent]
})
export class CoworkersPageComponent implements OnInit {
    displayedColumns: string[] = ['fullName', 'email'];
    displayedHeaders: string[] = ['Imię i Nazwisko', 'Email'];
    dataSource: any[] = [];

    constructor(private coworkersService: CooworkersService) { }

    ngOnInit(): void {
        this.subscribeCoworkeres();
    }

    private subscribeCoworkeres(): void {
        this.coworkersService.getAllItems().subscribe(res => { this.dataSource = res })
    }
}
