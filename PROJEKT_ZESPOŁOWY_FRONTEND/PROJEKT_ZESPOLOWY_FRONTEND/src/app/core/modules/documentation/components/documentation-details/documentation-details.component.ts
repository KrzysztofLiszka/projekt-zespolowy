import { Component } from '@angular/core';
import { DocumentationsService } from '../../../../services/documentations.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-documentation-details',
    imports: [CommonModule],
    templateUrl: './documentation-details.component.html',
    styleUrl: './documentation-details.component.scss'
})
export class DocumentationDetailsComponent {
    documentationId: string | null = null;
    documentation: any;


    constructor(
        private route: ActivatedRoute,
        private documentationService: DocumentationsService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.documentationId = this.route.snapshot.paramMap.get('id');
        if (this.documentationId) {
            this.loadDocumentation()
        }
    }

    loadDocumentation(): void {
        if (this.documentationId) {
            this.documentationService.getItemById(this.documentationId).subscribe({
                next: (data: any) => (this.documentation = data),
                error: (err: any) => console.error('Error loading visualization:', err),
            });
        }
    }
}
