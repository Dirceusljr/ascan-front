import { Injectable, signal } from '@angular/core';
import { ITodo } from '../models/interface/todo.interface';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {

  constructor() { }

  public todosState = signal<Array<ITodo>>([]);

  public updateTodos(todos: Array<ITodo>) {
    if(todos) {
      const updateTodos = [...this.todosState(), ...todos];
      this.todosState.set(updateTodos);
      this.saveToLocalStorage(updateTodos);
    }
  }

  saveToLocalStorage(updateTodos: ITodo[]) {
    const todosString = JSON.stringify(updateTodos);
    localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todosString);
  }
}
