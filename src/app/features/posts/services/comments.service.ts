import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { CommentsPost } from '../../../shared/models/post.model/comments-post.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  constructor(private http: HttpClient) {}

  getByPost(postId: number): Observable<CommentsPost[]> {
    return this.http.get<CommentsPost[]>(`/posts/${postId}/comments`);
  }

  create(postId: number, payload: Omit<CommentsPost, 'id' | 'createdAt'>) {
    return this.http.post<CommentsPost>(
      `/posts/${postId}/comments`,
      payload
    );
  }

  update(comment: CommentsPost) {
    return this.http.put<CommentsPost>(
      `/comments/${comment.id}`,
      comment
    );
  }

  delete(id: number) {
    return this.http.delete<void>(`/comments/${id}`);
  }
}

