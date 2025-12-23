import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Post } from '../../../shared/models/post.model/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly postsSubject = new BehaviorSubject<Post[]>([]);
  readonly posts$ = this.postsSubject.asObservable();

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();

  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  readonly error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  
  loadPosts(): Observable<Post[]> {
    this.loadingSubject.next(true); // O service ativa
    return this.http.get<Post[]>('/posts').pipe(
      tap(posts => {
        this.postsSubject.next(posts);
        this.loadingSubject.next(false); // O service desativa o dele
      }),
      catchError(err => {
        this.loadingSubject.next(false);
        return throwError(() => err);
      })
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`/posts/${id}`);
  }

  /** Create post (optimistic update) */
  create(post: Omit<Post, 'id'>): Observable<Post> {
    const current = this.postsSubject.value;

    const optimisticPost: Post = {
      ...post,
      id: Date.now()
    };

    this.postsSubject.next([optimisticPost, ...current]);

    return this.http.post<Post>('/posts', post).pipe(
      tap(created => {
        this.postsSubject.next(
          [created, ...this.postsSubject.value.filter(p => p.id !== optimisticPost.id)]
        );
      }),
      catchError(err => {
        this.postsSubject.next(current); // rollback
        return throwError(() => err);
      })
    );
  }

  /** Update post (optimistic update) */
  update(post: Post): Observable<Post> {
    const current = this.postsSubject.value;
    const index = current.findIndex(p => p.id === post.id);

    const updated = [...current];
    updated[index] = post;
    this.postsSubject.next(updated);

    return this.http.put<Post>(`/posts/${post.id}`, post).pipe(
      catchError(err => {
        this.postsSubject.next(current); // rollback
        return throwError(() => err);
      })
    );
  }

  /** Delete post (optimistic update) */
  delete(id: number): Observable<void> {
    const current = this.postsSubject.value;
    this.postsSubject.next(current.filter(p => p.id !== id));

    return this.http.delete<void>(`/posts/${id}`).pipe(
      catchError(err => {
        this.postsSubject.next(current); // rollback
        return throwError(() => err);
      })
    );
  }

  /** Get post from cache */
  getById(id: number): Post | undefined {
    return this.postsSubject.value.find(p => p.id === id);
  }
}
