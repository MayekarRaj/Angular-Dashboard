import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Student } from '../model/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  // add student
  async addStudent(student: Student) {
    try{
      const studentCollection = collection(this.firestore, 'students');
      const docRef = await addDoc(studentCollection, {...student});
      student.id = docRef.id;
      console.log("Student added with ID: ", docRef.id);
      // return docRef.id;
    } catch (e) {
      console.error("Error adding student: ", e);
      
    }
  }

  // get all students
  getAllStudents(): Observable<Student[]>{
    const studentCollection = collection(this.firestore, 'students');
    return collectionData(studentCollection, { idField: 'id'}) as Observable<Student[]>;
  }

  // delete student
  async deleteStudent(studentId: string){
    try {
      const studentDocRef = doc(this.firestore, `students/${studentId}`);
      await deleteDoc(studentDocRef);
      console.log("Student with deleted ID: ", studentId);
    } catch (e) {
      console.error("Error deleting student: ", e);
    }
  }

  // update student
  async updateStudent(studentId: string, updateData: Partial<Student>){
    try {
      const studentDocRef = doc(this.firestore, `students/${studentId}`);
      await updateDoc(studentDocRef, updateData);

      console.log("Student data updated ID: ", studentId);
    } catch (e) {
      console.error("Error updating student: ", e);
    } 
  }
}
