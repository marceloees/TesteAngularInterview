import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommentsService } from '../../services/comments.service';
import { Post } from '../../../../shared/models/post.model/post.model';
import { MatIcon } from '@angular/material/icon';
import { CommentsPost } from '../../../../shared/models/post.model/comments-post.model';

@Component({
  standalone: true,
  selector: 'app-comment-form',
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule, 
    MatIcon
  ]
})
export class CommentFormComponent {

  @Input({ required: true }) postId!: number;
  @Output() created = new EventEmitter<CommentsPost>();

  form = this.fb.nonNullable.group({
    body: ['']
  });

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService
  ) {}

  submit(): void {
    if (!this.form.valid) return;

    const payload: Omit<CommentsPost, 'id'> = {
      postId: this.postId,
      name: 'Usuário Anônimo',
      email: 'anonimo@site.com',
      body: this.form.value.body!
    };

    this.commentsService.create(payload).subscribe(comment => {
      this.created.emit(comment);
      this.form.reset();
    });
  }
}