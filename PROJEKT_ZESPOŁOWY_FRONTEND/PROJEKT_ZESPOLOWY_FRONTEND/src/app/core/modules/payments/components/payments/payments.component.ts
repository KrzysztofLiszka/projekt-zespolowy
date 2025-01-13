import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CooworkersService } from '../../../../services/cooworkers.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-payments',
  imports: [TableComponent, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {
  formGroup!: FormGroup;
  displayedColumns: string[] = ['fullName', 'amount'];
  displayedHeaders: string[] = ['Imię i Nazwisko', 'Należna kwota'];
  dataSource: any[] = [];

  constructor(private coworkersService: CooworkersService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      fromDate: new FormControl<Date | null>(null),
      toDate: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    this.subscribePayments();
  }

  subscribePayments(): void {
    const from = this.formGroup.get('fromDate')?.value;
    const to = this.formGroup.get('toDate')?.value;

    this.coworkersService.getSalaries(from, to).subscribe((res) => {
      this.dataSource = res;
    });
  }
}
