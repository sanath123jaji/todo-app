import { Injectable } from '@angular/core';
import { Todo } from 'models/todo.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private readonly _httpService: HttpClient) {}

  todos: Todo[] = [];

  public get todo() {
    return this.todos;
  }

  getAllTodos(userId: string) {
    return this._httpService.get<{
      data: Array<{ id: string; name: string; status: boolean }>;
    }>(`${environment.baseUrl}/${userId}/todos`);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  syncTodo() {
    return this._httpService.post(
      `${environment.baseUrl}/sync`,
      this.todos
        .filter((e) => !e.synced)
        ?.map((e) => {
          return {
            id: e.id,
            name: e.text,
            status: e.completed,
          };
        })
    );
  }

  toggleTodo(todoId: string) {
    const todo = this.todos.find((e) => e.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
      todo.synced = false;
    }
  }

  syncSuccess() {
    this.todos.forEach((e) => {
      e.synced = true;
    })
  }
}
