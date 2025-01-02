import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-preview-image-dialog',
    templateUrl: './preview-image-dialog.component.html',
    styleUrls: ['./preview-image-dialog.component.scss']
})
export class PreviewImageDialogComponent {
    imageData: string;

    constructor(
        public dialogRef: MatDialogRef<PreviewImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { imageData: string }
    ) {
        this.imageData = data.imageData;
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
