import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-or-add-schedule',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './edit-or-add-schedule.component.html',
    styleUrls: ['./edit-or-add-schedule.component.scss'],
})
export class EditOrAddScheduleComponent {
    scheduleForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EditOrAddScheduleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { schedule: any; isEdit: boolean }
    ) {
        // Tworzenie formularza z danymi wejściowymi lub pustymi wartościami
        this.scheduleForm = this.fb.group({
            name: [data.schedule?.name || '', Validators.required],
            date: [data.schedule?.date || '', [Validators.required, this.validateDate]],
            hour: [data.schedule?.hour || '', [Validators.required, this.validateHour]],
        });
    }

    // Metoda anulowania (zamknięcie bez danych)
    onCancel(): void {
        this.dialogRef.close();
    }

    // Metoda zapisu (zamknięcie z danymi)
    onSave(): void {
        if (this.scheduleForm.valid) {
            this.dialogRef.close(this.scheduleForm.value);
        }
    }

    private validateDate(control: any): { [key: string]: boolean } | null {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Format YYYY-MM-DD
        if (!control.value || datePattern.test(control.value)) {
            return null;
        }
        return { invalidDate: true };
    }

    private validateHour(control: any): { [key: string]: boolean } | null {
        const hourPattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // Format HH:mm
        if (!control.value || hourPattern.test(control.value)) {
            return null;
        }
        return { invalidHour: true };
    }
}
