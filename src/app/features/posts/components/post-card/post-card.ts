import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Post } from '../../../../shared/models/post.model/post.model';
import { CommentFormComponent } from '../../../../features/posts/comments/comment-form/comment-form';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { PostDialogComponent } from '../post-dialog/post-dialog';
import { MatDialog } from '@angular/material/dialog';
import { PostsService } from '../../services/posts.service';
import { CommentListComponent } from '../../comments/comment-list/comment-list';


@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommentFormComponent,
    CommentListComponent,
  ],
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.css'],
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  @ViewChild('commentList') commentList!: CommentListComponent;

  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<number>();
  @Output() create = new EventEmitter<void>();
  constructor(
    private dialog: MatDialog,
    private postsService: PostsService
  ) {}

  reloadComments() {
    this.commentList.ngOnInit();
}

editPost() {
  const dialogRef = this.dialog.open(PostDialogComponent, {
    width: '100%',
    maxWidth: '500px',
    data: { post: this.post }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;

    this.postsService.update(result).subscribe();
  });
}

deletePost() {
  const confirmed = confirm('Deseja realmente excluir este post?');

    if (!confirmed) return;

    this.postsService.delete(this.post.id).subscribe();
}
}
