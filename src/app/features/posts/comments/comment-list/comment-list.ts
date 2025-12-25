import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommentsService } from '../../services/comments.service';
import { CommentsPost } from '../../../../shared/models/post.model/comments-post.model';
import { Observable } from 'rxjs';

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

  @Input({ required: true }) postId!: number;

  comments$!: Observable<CommentsPost[]>;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.comments$ = this.commentsService.getByPostId(this.postId);
  }
}
