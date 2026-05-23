import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-todo-detail',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './todo-detail.html',
  styleUrl: './todo-detail.css'
})
export class TodoDetail implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPostDetails(id);
    }
  }

  private fetchPostDetails(id: string): void {
    this.isLoading = true;
    this.error = null;

    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(r => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(r => r.json())
    ])
    .then(([post, comments]: [Post, Comment[]]) => {
      this.post = post;
      this.comments = comments;
      this.isLoading = false;
      this.cdr.detectChanges(); // Manually trigger Angular change detection
    })
    .catch(err => {
      this.error = `Failed to fetch post #${id}: ` + err.message;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }
}
