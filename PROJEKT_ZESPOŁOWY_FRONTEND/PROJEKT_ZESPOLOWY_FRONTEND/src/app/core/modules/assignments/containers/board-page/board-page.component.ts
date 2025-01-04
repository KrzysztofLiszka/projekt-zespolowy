import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentsService } from '../../../../services/assignments.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AddOrEditAssignmentDialogComponent } from '../../components/add-or-edit-assignment-dialog/add-or-edit-assignment-dialog.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-board-page',
    imports: [CommonModule, DragDropModule, MatIcon],
    templateUrl: './board-page.component.html',
    styleUrl: './board-page.component.scss'
})
export class BoardPageComponent implements OnInit, OnDestroy {
    statuses = ['TO_DO', 'IN_PROGRESS', 'REVIEWED', 'DONE'];
    assignments: any[] = [];
    subscription = new Subscription();
    userImages: { [userId: string]: string } = {};

    constructor(private assignmentsService: AssignmentsService, private authService: AuthService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadAssignments();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private loadAssignments(): void {
        this.subscription.add(
            this.assignmentsService.getAllItems().subscribe(res => {
                this.assignments = res;
                // Load user images for each assignment
                this.assignments.forEach(assignment => this.loadUserImage(assignment.userId));
            })
        );
    }

    openAddDialog(): void {
        const dialogRef = this.dialog.open(AddOrEditAssignmentDialogComponent, {
            width: '400px',
            data: { assignment: null, isEdit: false },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.assignmentsService.addItem(result).subscribe(() => {
                    this.loadAssignments();
                });
            }
        });
    }

    openEditDialog(assignment: any): void {
        const dialogRef = this.dialog.open(AddOrEditAssignmentDialogComponent, {
            width: '400px',
            data: { assignment: assignment, isEdit: true },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.assignmentsService.updateItem(result).subscribe(() => {
                    this.loadAssignments();
                });
            }
        });
    }

    deleteAssignment(assignment: any): void {
        this.subscription.add(
            this.assignmentsService.deleteItem(assignment.uuid).subscribe((result) => {
                if (result) {
                    this.loadAssignments();
                }
            })
        );
    }

    drop(event: CdkDragDrop<any[]>, status: string): void {
        const assignment = event.item.data;

        if (assignment.status === status) return;
        const updatedAssignment = { ...assignment, status };

        const previousAssignments = event.previousContainer.data;
        const currentAssignments = event.container.data;

        previousAssignments.splice(event.previousIndex, 1);

        currentAssignments.unshift(updatedAssignment);

        this.assignmentsService.updateItem(updatedAssignment).subscribe((result) => {
            if (result) {
                this.loadAssignments();
            }
        });
    }


    getAssignmentsByStatus(status: string): any[] {
        return this.assignments.filter(a => a.status === status);
    }

    getStatusName(status: string): string {
        const names = {
            TO_DO: 'DO ZROBIENIA',
            IN_PROGRESS: 'W TRAKCIE PRACY',
            REVIEWED: 'W TRAKCIE SPRAWDZANIA',
            DONE: 'GOTOWE',
        } as const;
        return names[status as keyof typeof names];
    }

    getColumnColor(status: string): string {
        const colors = {
            TO_DO: 'rgba(45, 47, 51, 1)',
            IN_PROGRESS: 'rgba(45, 47, 51, 1)',
            REVIEWED: 'rgba(45, 47, 51, 1)',
            DONE: 'rgba(45, 47, 51, 1)',
        } as const;
        return colors[status as keyof typeof colors];
    }

    getBase64Data(assignment: any): string {
        return `data:image/jpg;base64,${assignment.profilePicture}`;
    }

    loadUserImage(userId: string): void {
        if (userId && !this.userImages[userId]) {
            console.log(userId);
            this.authService.getUserProfilePicture(userId).subscribe({
                next: (response) => {
                    const base64Image = response.data;
                    if (base64Image) {
                        this.userImages[userId] = base64Image;
                    } else {
                        console.error('Brak danych obrazu');
                    }
                },
                error: (err) => {
                    console.error('Failed to load image', err);
                }
            });
        }
    }

    convertToBase64(imageData: any): string {
        return btoa(String.fromCharCode(...new Uint8Array(imageData.Data)));
    }
}
