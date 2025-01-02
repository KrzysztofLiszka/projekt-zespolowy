import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisualizationsService } from '../../../services/visualizations.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddVisualizationDialogComponent } from '../add-visualization-dialog/add-visualization-dialog.component';
import { PreviewImageDialogComponent } from '../preview-image-dialog/preview-image-dialog.component';

@Component({
    selector: 'app-visualization-page',
    templateUrl: './visualization-page.component.html',
    styleUrls: ['./visualization-page.component.scss'],
    imports: [CommonModule]
})
export class VisualizationPageComponent implements OnInit {
    visualizationId: string | null = null;
    visualization: any;
    images: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private visualizationService: VisualizationsService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.visualizationId = this.route.snapshot.paramMap.get('id');
        if (this.visualizationId) {
            this.loadVisualization();
            this.loadImages();
        }
    }
    loadVisualization(): void {
        if (this.visualizationId) {
            this.visualizationService.getItemById(this.visualizationId).subscribe({
                next: (data: any) => (this.visualization = data),
                error: (err: any) => console.error('Error loading visualization:', err),
            });
        }
    }
    loadImages(): void {
        if (this.visualizationId) {
            this.visualizationService.getImages(this.visualizationId).subscribe({
                next: (data: any[]) => (this.images = data),
                error: (err: any) => console.error('Error loading images:', err),
            });
        }
    }

    onAddClick(): void {
        const dialogRef = this.dialog.open(AddVisualizationDialogComponent, {
            data: { visualizationId: this.visualization.id }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.visualizationService.addImage(this.visualization.uuid, result).subscribe(() => {
                    this.loadImages();
                });
            }
        });
    }

    onDeleteImage(imageId: string): void {
        this.visualizationService.deleteImage(imageId).subscribe({
            next: () => this.loadImages(),
            error: (err: any) => console.error('Error deleting image:', err),
        });
    }

    onPreviewImage(imageData: string): void {
        this.dialog.open(PreviewImageDialogComponent, {
            width: '600px',
            data: { imageData }
        });
    }
}
