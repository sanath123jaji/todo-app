import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodosService } from '../services/todos.service';
import { Todo } from 'models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  constructor(private dataService: TodosService) { }

  todos: Todo[] = this.dataService.todos;
  loggedIn: boolean = false;
  userIdFormControl: FormControl = new FormControl(null, Validators.required);
  todoFormControl: FormControl = new FormControl(null, Validators.required);


  ngOnInit(): void {
  }

  onClickLogin() {
    this.loggedIn = true;
    this.dataService.getAllTodos(this.userIdFormControl.value).subscribe((todos) => {
      todos.data.forEach(element => {
        this.dataService.addTodo(new Todo(element.id, element.name, element.status, true))
      })
      this.todos = this.dataService.todos;
    });
  }

  isSyncAvailable(){
    return this.todos.some(todo => !todo.synced) && window.navigator.onLine;
  }

  onAddTodo() { 
    console.log(this.todoFormControl.value)  
    this.dataService.addTodo(new Todo(new Date().valueOf().toString(), this.todoFormControl.value, false, false))
    this.todoFormControl.reset();
    this.todos = this.dataService.todos;
  }

  toggleCompleted(todo: Todo) {
    this.dataService.toggleTodo(todo.id);
    this.todos = this.dataService.todos;
  }

  syncTodos(){
    this.dataService.syncTodo().subscribe(() => {
      this.dataService.syncSuccess();
      this.todos = this.dataService.todos;
    });
  }
  
}
