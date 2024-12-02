import { Component } from '@angular/core';

@Component({
    selector: 'app-join-or-create-workplace',
    standalone: true,
    imports: [],
    templateUrl: './join-or-create-workplace.component.html',
    styleUrl: './join-or-create-workplace.component.scss'
})
export class JoinOrCreateWorkplaceComponent {

    //TODO:
    joinWorkplace() {
        console.log('Dołączanie do miejsca pracy...');
    }

    //TODO:
    createWorkplace() {
        console.log('Tworzenie nowego miejsca pracy...');
    }

    //TODO:
    exit() {
        console.log('Wyjście do...');
    }

}
