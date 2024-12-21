import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users-page',
  imports: [TableComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {
  displayedColumns: string[] = ['email', 'name', 'surname', 'roleName', 'hourlyRate', 'actions'];
  displayedHeaders: string[] = ['Email', 'Imie', 'Nazwisko', 'Rola', 'Stawka Godzinowa', 'Akcja'];
  dataSource: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscribeUserse();
  }

  private subscribeUserse(): void {
    this.authService.getAllItems().subscribe(res => { this.dataSource = res })
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
