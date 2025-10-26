import { Injectable, signal } from '@angular/core';
import { ITodo } from '../models/interface/todo.interface';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {

  constructor() { }

  public todosState = signal<Array<ITodo>>([]);

  public updateTodos(todo: ITodo) {
    if(todo) {
      const updatedTodos = [...this.todosState(), todo];
      this.todosState.set(updatedTodos);
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    const todosString = JSON.stringify(this.todosState());
    localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todosString);
  }
}
