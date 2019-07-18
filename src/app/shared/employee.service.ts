import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private dbPath = '/Test';
  formData: Employee;
  constructor(private firesore: AngularFirestore) { }

  getEmployees() {
    return this.firesore.collection('employees').snapshotChanges();
  }
}
