import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-edit-user-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit {
    userForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EditUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { user: any },
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            name: [this.data.user.name || '', Validators.required],
            surname: [this.data.user.surname || '', Validators.required],
            email: [this.data.user.email || '', [Validators.required, Validators.email]],
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.userForm.valid) {
            const updatedUser = this.userForm.value;
            this.authService.updateUser(updatedUser).subscribe(
                (response) => {
                    this.dialogRef.close(updatedUser);
                },
                (error) => {
                    console.error('Error updating user', error);
                }
            );
        }
    }
}
