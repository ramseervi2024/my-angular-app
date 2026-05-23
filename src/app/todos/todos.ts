import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-todos',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './todos.html',
  styleUrl: './todos.css'
})
export class Todos implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then((data: Post[]) => {
        this.posts = data.slice(0, 20);
        this.isLoading = false;
        this.cdr.detectChanges(); // Manually trigger Angular change detection
      })
      .catch(err => {
        this.error = 'Failed to fetch posts: ' + err.message;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }
}
