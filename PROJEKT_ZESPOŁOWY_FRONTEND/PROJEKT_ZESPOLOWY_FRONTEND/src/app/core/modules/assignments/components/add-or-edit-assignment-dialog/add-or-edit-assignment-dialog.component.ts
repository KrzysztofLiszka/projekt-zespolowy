import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@Component({
    selector: 'app-add-or-edit-assignment-dialog',
    imports: [CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule, MatOption, MatSelectModule],
    templateUrl: './add-or-edit-assignment-dialog.component.html',
    styleUrl: './add-or-edit-assignment-dialog.component.scss'
})
export class AddOrEditAssignmentDialogComponent {
    assignmentForm: FormGroup;
    statuses: ("TO_DO" | "IN_PROGRESS" | "REVIEWED" | "DONE")[] = ["TO_DO", "IN_PROGRESS", "REVIEWED", "DONE"];
    statusNames = {
        TO_DO: 'DO ZROBIENIA',
        IN_PROGRESS: 'W TRAKCIE PRACY',
        REVIEWED: 'W TRAKCIE SPRAWDZANIA',
        DONE: 'GOTOWE'
    };

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AddOrEditAssignmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { assignment: any; isEdit: boolean }
    ) {
        this.assignmentForm = this.fb.group({
            name: [data.assignment?.name || '', Validators.required],
            description: [data.assignment?.description || '', Validators.required],
            status: [data.assignment?.status || 'TO_DO', Validators.required],
            uuid: [data.assignment?.uuid || ''],
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.assignmentForm.valid) {
            this.dialogRef.close(this.assignmentForm.value);
        }
    }

    getStatusName(status: keyof typeof this.statusNames): string {
        return this.statusNames[status];
    }
}
