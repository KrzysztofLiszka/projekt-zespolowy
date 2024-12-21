import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { DocumentationsService } from '../../../../services/documentations.service';

@Component({
  selector: 'app-documentation-page',
  imports: [TableComponent],
  templateUrl: './documentation-page.component.html',
  styleUrl: './documentation-page.component.scss'
})
export class DocumentationPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  displayedHeaders: string[] = ['Nazwa', 'Akcja'];
  dataSource: any[] = [];

  constructor(private documentationsService: DocumentationsService) { }

  ngOnInit(): void {
    this.subscribeCoworkeres();
  }

  private subscribeCoworkeres(): void {
    this.documentationsService.getAllItems().subscribe(res => { this.dataSource = res })
  }

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
