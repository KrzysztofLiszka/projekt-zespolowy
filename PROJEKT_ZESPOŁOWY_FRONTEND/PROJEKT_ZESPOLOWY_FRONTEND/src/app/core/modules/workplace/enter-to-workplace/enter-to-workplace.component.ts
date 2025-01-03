import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { WorkplacesService } from '../../../services/workplaces.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-enter-to-workplace',
    imports: [CommonModule],
    templateUrl: './enter-to-workplace.component.html',
    styleUrl: './enter-to-workplace.component.scss'
})
export class EnterToWorkplaceComponent implements OnInit {
    dataSource: any[] = [];

    constructor(private workplacesService: WorkplacesService) { }

    ngOnInit(): void {
        this.subscribeWorkplaces();
    }

    private subscribeWorkplaces(): void {
        this.workplacesService.getAllItems().subscribe(res => { this.dataSource = res })
    }



}
