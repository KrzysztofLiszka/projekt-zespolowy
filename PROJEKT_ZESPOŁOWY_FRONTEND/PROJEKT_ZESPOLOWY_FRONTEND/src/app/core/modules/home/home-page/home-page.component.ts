import { Component } from '@angular/core';
import { ColumnComponent } from '../column/column.component';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [ColumnComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
