import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoSignalsService } from '../../services/todo-signals.service';
import { TodoKeyLocalStorage } from '../../models/enum/todoKeyLocalStorage.enum';
import { ITodo } from '../../models/interface/todo.interface';

@Component({
  selector: 'ascan-todo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
})
export class TodoCardComponent implements OnInit {
  private todoSignalService = inject(TodoSignalsService);

  private todosSignal = this.todoSignalService.todosState;

  public todosList = computed(() => this.todosSignal());

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const todosData = localStorage.getItem(
        TodoKeyLocalStorage.TODO_LIST
      ) as string;
      if (todosData) {
        this.todosSignal.set(JSON.parse(todosData));
      }
    }
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalService.saveToLocalStorage();
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.update((todos) => {
        return todos.map((todo) =>
          todo.id === todoId ? { ...todo, done: !todo.done } : todo
        );
      });
    }
    this.saveTodosInLocalStorage();
  }

  public handleDeleteTodo(todo: ITodo): void {
    this.todosSignal.update((todos) => {
      return todos.filter((item) => item.id !== todo.id);
    });

    this.saveTodosInLocalStorage();
  }
}
