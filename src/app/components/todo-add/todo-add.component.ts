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
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { PriorityEnum } from '../../models/enum/priority.enum';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ITodo } from '../../models/interface/todo.interface';
import { MatIconModule } from '@angular/material/icon';

/** Validador que impede datas no passado (considera só a data, sem hora) */
const notPastDateValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  if (!value) return null;
  const date = value instanceof Date ? new Date(value) : new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today ? { pastDate: true } : null;
};

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
    MatIconModule,
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
    dueDate: new FormControl('', [Validators.required, notPastDateValidator]),
    dueTime: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
    ]),
    priority: new FormControl('', [Validators.required]),
  });

  // getters para facilitar uso no template
  get title() {
    return this.todosForm.get('title')!;
  }
  get description() {
    return this.todosForm.get('description')!;
  }
  get dueDate() {
    return this.todosForm.get('dueDate')!;
  }
  get dueTime() {
    return this.todosForm.get('dueTime')!;
  }
  get priority() {
    return this.todosForm.get('priority')!;
  }

  handleCreateNewTodo() {
    this.todosForm.markAllAsTouched();

    if (this.todosForm.invalid) {
      return; // não fecha o modal nem cria quando inválido
    }

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
      id: Date.now(), // id único mais seguro
      title: this.todosForm.value.title as string,
      description: this.todosForm.value.description as string,
      dueDate: baseDate,
      priority: this.todosForm.value.priority as PriorityEnum,
      done: false,
    };
    this.todoSignalsService.updateTodos(newTodo);
    this.dialogRefService.close();
  }

  handleCloseModal() {
    this.dialogRefService.close();
  }
}
