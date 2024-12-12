import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-coworkers-page',
    templateUrl: './coworkers-page.component.html',
    styleUrls: ['./coworkers-page.component.scss'],
    standalone: true,
    imports: [TableComponent]
})
export class CoworkersPageComponent {
    displayedColumns: string[] = ['name', 'position', 'actions'];
    displayedHeaders: string[] = ['Name', 'Position', 'Actions'];

    dataSource = [
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
        { name: 'Sam Brown', position: 'Designer' },
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
        { name: 'Sam Brown', position: 'Designer' },
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
        { name: 'Sam Brown', position: 'Designer' },
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
        { name: 'Sam Brown', position: 'Designer' },
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
        { name: 'Sam Brown', position: 'Designer' },
        { name: 'John Doe', position: 'Software Engineer' },
        { name: 'Jane Smith', position: 'Product Manager' },
    ];

    onAdd() {
        console.log('Add clicked');
    }

    onEdit(item: any) {
        console.log('Edit clicked', item);
    }

    onDelete(item: any) {
        console.log('Delete clicked', item);
    }
}
