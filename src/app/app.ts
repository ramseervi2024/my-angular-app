import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { MainContent } from './main-content/main-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MainContent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
