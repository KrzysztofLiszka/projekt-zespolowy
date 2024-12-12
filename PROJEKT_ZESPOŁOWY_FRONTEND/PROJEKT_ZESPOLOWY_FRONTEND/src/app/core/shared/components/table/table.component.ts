import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {

    @Input() dataSource: any;
    @Input() displayedColumns: string[] = [];
    @Input() displayedHeaders: string[] = [];
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
