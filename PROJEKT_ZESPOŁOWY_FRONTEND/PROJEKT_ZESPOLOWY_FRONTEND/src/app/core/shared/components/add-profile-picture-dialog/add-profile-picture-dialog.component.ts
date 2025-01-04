import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from './User.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-profile-picture-dialog',
    templateUrl: './add-profile-picture-dialog.component.html',
    styleUrls: ['./add-profile-picture-dialog.component.scss'],
    imports: [CommonModule]
})
export class AddProfilePictureDialogComponent implements OnInit {
    selectedFile: File | null = null;
    selectedFileName: string | null = null;
    reader = new FileReader();
    currentUser: User | null = null;

    constructor(
        private authService: AuthService,
        private dialogRef: MatDialogRef<AddProfilePictureDialogComponent>
    ) { }

    ngOnInit(): void {
        this.getCurrentUser();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedFile = input.files[0];
            this.selectedFileName = input.files[0].name;
        }
    }

    onSave(): void {
        if (this.selectedFile) {
            this.reader.readAsDataURL(this.selectedFile);
            this.reader.onload = () => {
                const base64String = this.reader.result as string;
                const strippedBase64 = base64String.replace(/^data:image\/(jpeg|png|jpg);base64,/, "");

                localStorage.setItem('picture', base64String);

                if (this.currentUser !== null) {
                    this.currentUser.profilePicture = strippedBase64;

                    this.authService.updateUser(this.currentUser).subscribe(
                        () => {
                            window.location.reload();
                        },
                        (error) => {
                            console.error('Błąd aktualizacji użytkownika:', error);
                            alert('Wystąpił problem podczas zapisywania zdjęcia.');
                        }
                    );
                }
            };
        }
    }

    onCancel(): void {
        this.selectedFile = null;
        this.selectedFileName = null;
        this.dialogRef.close();
    }

    private getCurrentUser(): void {
        this.authService.getCurrentUser().subscribe({
            next: (data: any) => {
                this.currentUser = data;
            },
            error: (err: any) => {
                console.error('Error loading user:', err);
            }
        });
    }
}
