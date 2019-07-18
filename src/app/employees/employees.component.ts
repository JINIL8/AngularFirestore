import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private service: EmployeeService, private firestore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
    resetForm(form?: NgForm) {
      if (form != null) {
        form.resetForm();
        this.service.formData = {
          id: null,
          fullName: '',
          position: '',
          empCode: '',
          mobile: '',
        };
      }
    }
    onSubmit(form: NgForm) {
      const data = Object.assign({}, form.value);
      delete data.id;
      if (form.value.id == null) {
        this.firestore.collection('employees').add(data);
      } else {
        this.firestore.doc('employees/' + form.value.id).update(data);
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'EMP. Register');

        }
    }
}
