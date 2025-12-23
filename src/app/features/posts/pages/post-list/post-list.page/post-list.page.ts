import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { signal } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../../../shared/models/post.model/post.model';
import { PostCardComponent } from '../../../components/post-card/post-card';

@Component({
  standalone: true,
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.css'],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    PostCardComponent
  ],
})


export class PostListPage implements OnInit {
  posts = signal<Post[]>([]);
  pagedPosts = signal<Post[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  readonly pageSize = 4;
  pageIndex = 0;
  errorMessage: string | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loading.set(true);

    this.postsService.loadPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.updatePagedPosts();
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar');
        this.loading.set(false);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.updatePagedPosts();
  }

  private updatePagedPosts(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedPosts.set(this.posts().slice(start, end));
  }
}
