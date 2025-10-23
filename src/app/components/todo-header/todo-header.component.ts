import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'ascan-todo-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.css'
})
export class TodoHeaderComponent {
  private dialogService = inject(MatDialog)

  public handleOpenModal(): void {
    this.dialogService.open(TodoAddNewEntryFormComponent, {
      width: '50vw',
      maxHeight: '80vh',
    })
  }

}
