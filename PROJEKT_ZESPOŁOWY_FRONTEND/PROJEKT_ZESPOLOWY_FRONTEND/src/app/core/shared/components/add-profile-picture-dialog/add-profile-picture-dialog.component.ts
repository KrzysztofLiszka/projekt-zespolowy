import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-add-profile-picture-dialog',
    templateUrl: './add-profile-picture-dialog.component.html',
    imports: [CommonModule],
    styleUrls: ['./add-profile-picture-dialog.component.scss'],
})
export class AddProfilePictureDialogComponent {
    selectedFile: File | null = null;
    selectedFileName: string | null = null;
    reader = new FileReader();
    private subscription: Subscription = new Subscription();

    constructor(private authService: AuthService) { }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedFile = input.files[0];
            this.selectedFileName = input.files[0].name;

            this.reader.readAsDataURL(this.selectedFile);
            this.reader.onload = () => {
                const base64String = this.reader.result as string;
                localStorage.setItem('picture', base64String);
                console.log('Base64 string zapisany w localStorage:', base64String);
            };
        }
    }

    onCancel(): void {
        this.selectedFile = null;
        this.selectedFileName = null;
    }

    onUpload(): void {
        if (this.selectedFile) {
            const base64String = localStorage.getItem('picture');
            if (base64String) {
                console.log('Base64 string z localStorage:', base64String);
            }
        }
    }
}
