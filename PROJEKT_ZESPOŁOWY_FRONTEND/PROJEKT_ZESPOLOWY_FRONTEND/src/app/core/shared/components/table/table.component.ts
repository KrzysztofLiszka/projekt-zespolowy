import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-table',
    providers: [DatePipe],
    standalone: true,
    imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {

    @Input() pageTitle: string = '';
    @Input() dataSource: any;
    @Input() displayedColumns: string[] = [];
    @Input() displayedHeaders: string[] = [];
    @Input() displayAddButton: boolean = false;
    @Input() isRedirect: boolean = false;
    @Input() displayEdit: boolean = true;
    selectedRoles: string[] = [];

    @Output() addClicked = new EventEmitter<any>();
    @Output() editClicked = new EventEmitter<any>();
    @Output() deleteClicked = new EventEmitter<any>();
    @Output() selectClicked = new EventEmitter<any>();

    constructor(private router: Router, private route: ActivatedRoute) { }

    onAddClick(): void {
        this.addClicked.emit();
    }

    onEditClick(item: any): void {
        if (this.isRedirect) {
            this.router.navigate([`${item.uuid}`], { relativeTo: this.route });
            console.log(item.uuid);
        } else {
            this.editClicked.emit(item);
        }
    }

    onDeleteClick(item: any): void {
        this.deleteClicked.emit(item);
    }

    onNameClick(item: any): void {
        if (this.isRedirect && !this.displayEdit) {
            this.router.navigate([`${item.uuid}`], { relativeTo: this.route });
            console.log(item.uuid);
        }
    }

}
