import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { STUDENTS } from '../mock-students';
import { StudentService } from '../student.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students = STUDENTS;
  student: Student[] = [];

  constructor(private studentService: StudentService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.getStudents();
  }

  selectedStudent?: Student;
  onSelect(student: Student): void {
  this.selectedStudent = student;
  this.messageService.add(`Componente do Estudante: Estudante selecionado id=${student.id}`);
}

getStudents(): void {
  this.studentService.getStudents()
      .subscribe(students => this.students = students);
}

add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.studentService.addStudent({ name } as Student)
    .subscribe(student => {
      this.students.push(student);
    });
}

delete(student: Student): void {
  this.students = this.students.filter(h => h !== student);
  this.studentService.deleteStudent(student.id).subscribe();
}
}