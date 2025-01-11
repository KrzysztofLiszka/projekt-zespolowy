import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { WorkplacesService } from '../../../services/workplaces.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-enter-to-workplace',
    imports: [CommonModule],
    templateUrl: './enter-to-workplace.component.html',
    styleUrl: './enter-to-workplace.component.scss'
})
export class EnterToWorkplaceComponent implements OnInit {
    dataSource: any[] = [];

    constructor(private workplacesService: WorkplacesService, private router: Router) { }

    ngOnInit(): void {
        this.subscribeWorkplaces();
    }

    private subscribeWorkplaces(): void {
        this.workplacesService.getAllItems().subscribe(res => { this.dataSource = res })
    }

    joinWorkplace(id: string): void {
        this.workplacesService.joinWorkplace(id).subscribe(res => this.router.navigateByUrl('/login'))

    }
}
