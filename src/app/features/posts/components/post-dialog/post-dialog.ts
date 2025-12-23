import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../../../shared/models/post.model/post.model';

export interface PostDialogData {
  post?: Post;
}

@Component({
  standalone: true,
  selector: 'app-post-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './post-dialog.html',
  styleUrls: ['./post-dialog.css']
})
export class PostDialogComponent {

  readonly isEditMode = !!this.data.post;

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostDialogData
  ) {
    if (data.post) {
      this.form.patchValue({
        title: data.post.title,
        body: data.post.body
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    this.dialogRef.close({
      ...this.data.post,
      ...this.form.getRawValue()
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
