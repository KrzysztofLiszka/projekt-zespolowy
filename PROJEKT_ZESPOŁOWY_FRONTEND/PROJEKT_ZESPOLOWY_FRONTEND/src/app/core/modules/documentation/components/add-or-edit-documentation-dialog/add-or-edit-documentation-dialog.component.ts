import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-or-edit-documentation-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './add-or-edit-documentation-dialog.component.html',
    styleUrls: ['./add-or-edit-documentation-dialog.component.scss'],
})
export class AddOrEditDocumentationDialogComponent {
    documentationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AddOrEditDocumentationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { documentation: any; isEdit: boolean }
    ) {
        this.documentationForm = this.fb.group({
            name: [data.documentation?.name || '', Validators.required],
            descriptionHtmlContent: [
                data.documentation?.descriptionHtmlContent || '',
                Validators.required,
            ],
            uuid: [data.documentation?.uuid || ''],
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        console.log(this.data);
        if (this.documentationForm.valid) {
            this.dialogRef.close(this.documentationForm.value);
        }
    }
}
