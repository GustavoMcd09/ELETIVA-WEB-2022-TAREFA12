import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsUrl = 'http://localhost:3000/students';  // URL to web api


  constructor(private http: HttpClient,
    private messageService: MessageService) {

  }

  /** GET heroes from the server */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(_ => this.log('estudantes buscados')),
        catchError(this.handleError<Student[]>('getStudents', []))
      );
  }


  /** GET hero by id. Will 404 if id not found */
  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`Estudante selecionado id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Serviço de estudante: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} Erro: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** PUT: update the hero on the server */
updateStudent(student: Student): Observable<any> {
  return this.http.put(this.studentsUrl, student, this.httpOptions).pipe(
    tap(_ => this.log(`updated student id=${student.id}`)),
    catchError(this.handleError<any>('updateStudent'))
  );
}
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/** POST: add a new hero to the server */
addStudent(student: Student): Observable<Student> {
  return this.http.post<Student>(this.studentsUrl, student, this.httpOptions).pipe(
    tap((newStudent: Student) => this.log(`added Student w/ id=${newStudent.id}`)),
    catchError(this.handleError<Student>('addStudent'))
  );
}

/** DELETE: delete the hero from the server */
deleteStudent(id: number): Observable<Student> {
  const url = `${this.studentsUrl}/${id}`;

  return this.http.delete<Student>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted student id=${id}`)),
    catchError(this.handleError<Student>('deleteStudent'))
  );
}
}