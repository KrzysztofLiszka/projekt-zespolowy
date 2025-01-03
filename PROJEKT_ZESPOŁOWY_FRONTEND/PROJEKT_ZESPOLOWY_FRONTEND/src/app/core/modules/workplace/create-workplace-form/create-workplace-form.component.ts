import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { WorkplacesService } from '../../../services/workplaces.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-workplace-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './create-workplace-form.component.html',
    styleUrl: './create-workplace-form.component.scss'
})
export class CreateWorkplaceFormComponent {
    workplaceForm: FormGroup;
    constructor(private fb: FormBuilder, private workplaceService: WorkplacesService) {
        this.workplaceForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    onSubmit() {
        if (this.workplaceForm.valid) {
            const newWorkplace = this.workplaceForm.value;
            this.workplaceService.addNewWorkplace(newWorkplace).subscribe(
                (response) => {
                    alert('Zespół został pomyślnie dodany!');
                    this.workplaceForm.reset();
                },
                (error) => {
                    console.error('Wystąpił błąd:', error);
                    alert('Nie udało się dodać zespołu.');
                }
            );
        }
    }
}
