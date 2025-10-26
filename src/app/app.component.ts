import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoHeaderComponent } from "./components/todo-header/todo-header.component";
import { TodoCardComponent } from "./components/todo-card/todo-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoHeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ascan-front';
}
