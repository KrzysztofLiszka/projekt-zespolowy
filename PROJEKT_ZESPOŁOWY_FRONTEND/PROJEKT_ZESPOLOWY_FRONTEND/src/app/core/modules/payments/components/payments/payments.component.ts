import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CooworkersService } from '../../../../services/cooworkers.service';

@Component({
  selector: 'app-payments',
  imports: [TableComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'amount'];
  displayedHeaders: string[] = ['Imię i Nazwisko', 'Należna kwota'];
  dataSource: any[] = [];

  constructor(private coworkersService: CooworkersService) { }

  ngOnInit(): void {
    this.subscribePayments();
  }

  private subscribePayments(): void {
    this.coworkersService.getSalaries().subscribe(res => { this.dataSource = res })
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
