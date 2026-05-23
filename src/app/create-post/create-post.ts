import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css'
})
export class CreatePost {
  isSubmitting = false;
  submitSuccess = false;
  submitError: string | null = null;
  createdPost: any = null;

  // --- Reactive Form Definition (equivalent to Formik's initialValues + useFormik) ---
  postForm = new FormGroup({
    userId: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
  });

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  // Shorthand getters for easy template access (like Formik's formik.errors.fieldName)
  get userId() { return this.postForm.get('userId')!; }
  get title() { return this.postForm.get('title')!; }
  get body() { return this.postForm.get('body')!; }

  // Helper: show error only if field is touched (same as Formik's touched.fieldName)
  showError(control: any): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    // Mark all fields as touched to trigger validation display (like Formik's handleSubmit)
    this.postForm.markAllAsTouched();

    if (this.postForm.invalid) return;

    this.isSubmitting = true;
    this.submitError = null;

    const payload = this.postForm.value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        this.createdPost = data;
        this.submitSuccess = true;
        this.isSubmitting = false;
        this.postForm.reset();
        this.cdr.detectChanges();
      })
      .catch(err => {
        this.submitError = 'Submission failed: ' + err.message;
        this.isSubmitting = false;
        this.cdr.detectChanges();
      });
  }

  onReset(): void {
    this.postForm.reset();
    this.submitSuccess = false;
    this.createdPost = null;
    this.submitError = null;
  }
}
