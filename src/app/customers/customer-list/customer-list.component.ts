import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customer: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomerList();
  }
  getCustomerList() {
    this.customerService.getCustomerList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })
      )
      )
    ).subscribe(customers => {
      this.customer = customers;
    });
  }
  deleteCustomers() {
    this.customerService.deleteAll();
  }
}
