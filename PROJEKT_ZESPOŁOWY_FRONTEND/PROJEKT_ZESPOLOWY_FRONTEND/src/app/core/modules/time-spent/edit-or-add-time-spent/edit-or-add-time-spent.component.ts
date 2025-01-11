import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-edit-or-add-time-spent',
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './edit-or-add-time-spent.component.html',
    styleUrls: ['./edit-or-add-time-spent.component.scss']
})
export class EditOrAddTimeSpentComponent {
    timeSpentForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EditOrAddTimeSpentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { timeSpent: any; isEdit: boolean }
    ) {

        const timeSpent = data.timeSpent || {};
        const date = timeSpent.date ? new Date(timeSpent.date) : new Date();
        const spentHours = timeSpent.spentHours || 0; // Default to 0 hours if not provided

        this.timeSpentForm = this.fb.group({
            date: [date.toISOString().split('T')[0], Validators.required],
            spentHours: [spentHours, [Validators.required, Validators.min(0)]],
            uuid: [timeSpent.uuid || '']
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.timeSpentForm.valid) {
            const formValue = this.timeSpentForm.value;

            const date = new Date(formValue.date);
            const spentHours = parseInt(formValue.spentHours, 10);

            date.setHours(0, 0, 0, 0); // Reset time to midnight
            const formattedDate = date.toISOString();

            const dataToSave = {
                uuid: formValue.uuid,
                date: formattedDate,
                spentHours: spentHours
            };

            console.log('Data to save:', dataToSave);
            this.dialogRef.close(dataToSave);
        } else {
            console.log('Form is invalid:', this.timeSpentForm);
        }
    }
}
