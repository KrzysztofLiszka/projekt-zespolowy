import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditOrAddScheduleComponent } from '../../schedule/edit-or-add-schedule/edit-or-add-schedule.component';
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
        public dialogRef: MatDialogRef<EditOrAddScheduleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { timeSpent: any; isEdit: boolean }
    ) {
        console.log(data);

        const date = new Date(data.timeSpent?.date);
        const hours = data.timeSpent?.spentHours.toString().padStart(2, '0');
        const minutes = '00';

        this.timeSpentForm = this.fb.group({
            date: [date.toISOString().split('T')[0] || '', Validators.required],
            spentHours: [`${hours}:${minutes}` || '', Validators.required],
            uuid: [data.timeSpent?.uuid || '']
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.timeSpentForm.valid) {
            const formValue = this.timeSpentForm.value;

            const date = new Date(formValue.date);
            const hours = formValue.spentHours.split(':')[0];
            const minutes = formValue.spentHours.split(':')[1];

            date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            const formattedDate = date.toISOString();

            const spentHours = parseInt(formValue.spentHours.split(':')[0]);

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
