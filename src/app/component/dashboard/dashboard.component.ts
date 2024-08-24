import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs';
import { Student } from '../../model/student';
import { DataService } from '../../shared/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',],
})

export class DashboardComponent implements OnInit {

  students$: Observable<Student[]> | undefined;

  first_name: string = "";
  last_name: string = "";
  email: string = "";
  mobile: string = "";

  constructor(private auth: AuthService, private data: DataService){}

  ngOnInit(): void {
      this.getStudents();
  }

  signOut() {
    this.auth.logout();
  }

  resetForm() {
    this.first_name = "";
    this.last_name = "";
    this.email = "";
    this.mobile = "";
  }

  async addStudents(){
    if(this.first_name && this.last_name && this.email && this.mobile){
      const newStudent: Student = {
        id: '',
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        mobile: this.mobile,
      };
      await this.data.addStudent(newStudent);
      this.resetForm();
    } else {
      alert("Please fill in the details");
    }
  }

  async updateStudent() {}

  async deleteStudent(student: Student) {
    if(window.confirm('Are you sure you want to delete? '+student.first_name+' '+student.last_name))
      this.data.deleteStudent(student.id);
  }

  getStudents() {
    this.students$ = this.data.getAllStudents();
  }

}
