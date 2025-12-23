import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommentsService } from '../../services/comments.service';
import { CommentsPost } from '../../../../shared/models/post.model/comments-post.model';

@Component({
  standalone: true,
  selector: 'app-comment-list',
  templateUrl: './comment-list.html',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class CommentListComponent implements OnInit {
  @Input({ required: true })
  postId!: number;

  comments: CommentsPost[] = [];
  loading = true;
  error: string | null = null;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.commentsService.getByPost(this.postId).subscribe({
      next: comments => {
        this.comments = comments;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar comentários';
        this.loading = false;
      }
    });
  }
}
