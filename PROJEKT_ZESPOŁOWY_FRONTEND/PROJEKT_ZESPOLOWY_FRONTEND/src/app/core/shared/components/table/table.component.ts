import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';

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
    selectedRoles: string[] = [];

    @Output() addClicked = new EventEmitter<any>();
    @Output() editClicked = new EventEmitter<any>();
    @Output() deleteClicked = new EventEmitter<any>();
    @Output() selectClicked = new EventEmitter<any>();


    onAddClick(): void {
        this.addClicked.emit();
    }

    onEditClick(item: any): void {
        this.editClicked.emit(item);
    }

    onDeleteClick(item: any): void {
        this.deleteClicked.emit(item);
    }

}
