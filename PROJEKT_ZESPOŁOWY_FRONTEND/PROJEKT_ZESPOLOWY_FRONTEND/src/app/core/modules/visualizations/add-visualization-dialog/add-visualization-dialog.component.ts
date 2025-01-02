import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-add-visualization-dialog',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './add-visualization-dialog.component.html',
    styleUrl: './add-visualization-dialog.component.scss'
})
export class AddVisualizationDialogComponent {
    visualizationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AddVisualizationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { visualizationId: string }
    ) {
        this.visualizationForm = this.fb.group({
            image: [null, Validators.required]
        });
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.visualizationForm.patchValue({ image: input.files[0] });
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.visualizationForm.valid) {
            this.dialogRef.close(this.visualizationForm.value.image);
        } else {
            console.error('Form is invalid:', this.visualizationForm);
        }
    }
}
