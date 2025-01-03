import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-join-or-create-workplace',
    imports: [],
    templateUrl: './join-or-create-workplace.component.html',
    styleUrl: './join-or-create-workplace.component.scss'
})
export class JoinOrCreateWorkplaceComponent {

    constructor(private router: Router) { }
    //TODO:
    joinWorkplace(): void {
        this.router.navigateByUrl("/enter-to-workplace");
    }

    createWorkplace() {
        this.router.navigateByUrl("/create-workplace");
    }

    exit() {
        console.log('Wyjście do...');
    }

}
