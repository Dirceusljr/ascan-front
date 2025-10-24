import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TodoSignalsService } from './../../services/todo-signals.service';
import { Component, inject } from '@angular/core';
import { TodoHeaderComponent } from '../todo-header/todo-header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { PriorityEnum } from '../../models/enum/priority.enum';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ITodo } from '../../models/interface/todo.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ascan-todo-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatOption,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.css',
})
export class TodoAddComponent {
  private todoSignalsService = inject(TodoSignalsService);
  private dialogRefService = inject(MatDialogRef<TodoHeaderComponent>);
  public allTodos = this.todoSignalsService.todosState();
  public PriorityEnum = PriorityEnum;

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    dueDate: new FormControl('', [Validators.required]),
    dueTime: new FormControl('', [Validators.required]),
    priority: new FormControl(PriorityEnum.MEDIUM, [Validators.required]),
  });

  handleCreateNewTodo() {
    if (this.todosForm.valid && this.todosForm.value) {
      const rawDate = this.todosForm.value.dueDate as Date | string;
      const time = this.todosForm.value.dueTime as string; // "HH:mm"
      const baseDate =
        rawDate instanceof Date ? new Date(rawDate) : new Date(rawDate);
      if (time) {
        const [hours, minutes] = time.split(':').map((v) => Number(v));
        if (!isNaN(hours) && !isNaN(minutes)) {
          baseDate.setHours(hours, minutes, 0, 0);
        }
      }

      const newTodo: ITodo = {
        id: this.allTodos.length + 1,
        title: this.todosForm.value.title as string,
        description: this.todosForm.value.description as string,
        dueDate: baseDate,
        priority: this.todosForm.value.priority as PriorityEnum,
        done: false,
      };
      this.todoSignalsService.updateTodos([newTodo]);
    }
    this.dialogRefService.close();
  }

  handleCloseModal() {
    this.dialogRefService.close();
  }
}
