import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../../../shared/models/post.model/post.model';
import { CommentListComponent } from '../../../comments/comment-list/comment-list';

@Component({
  standalone: true,
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommentListComponent
  ],
})
export class PostDetailPage implements OnInit {
  post?: Post;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error = 'Post inválido';
      this.loading = false;
      return;
    }

    
    const cached = this.postsService.getById(id);
    if (cached) {
      this.post = cached;
      this.loading = false;
      return;
    }

    this.postsService
      .getPostById(id)
      .pipe(
        finalize(() => {
          console.log('FINALIZE EXECUTADO');
          this.loading = false;
        })
      )
      .subscribe({
        next: (post: Post) => {
          this.post = post;
        },
        error: () => {
          this.error = 'Erro ao carregar o post 😢';
        }
      });
  }
}
