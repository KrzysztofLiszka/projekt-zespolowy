import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditOrAddScheduleComponent } from '../../schedule/edit-or-add-schedule/edit-or-add-schedule.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-edit-user-dialog',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule
    ],
    templateUrl: './edit-user-dialog.component.html',
    styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent {
    editUserForm: FormGroup;
    roles: any[] = [{ name: "Admin systemu" }, { name: "Właściciel firmy" }, { name: "Manager projektu" }, { name: "Członek projektu" }, { name: "Księgowa" }];
    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EditOrAddScheduleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { user: any; isEdit: boolean }
    ) {

        this.editUserForm = this.fb.group({
            uuid: [data.user?.uuid || ''],
            name: [data.user?.name || '', Validators.required],
            surname: [data.user?.surname || '', Validators.required],
            hourlyRate: [data.user?.hourlyRate || 0, [Validators.required, Validators.min(0)]],
            email: [data.user?.email || '', [Validators.required, Validators.email]],
            roleName: [data.user?.roleName, Validators.required]
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.editUserForm.valid) {
            this.dialogRef.close(this.editUserForm.value);
        }
    }
}
