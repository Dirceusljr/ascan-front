import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoHeaderComponent } from "./components/todo-header/todo-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ascan-front';
}
