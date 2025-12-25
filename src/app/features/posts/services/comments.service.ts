import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError, map } from 'rxjs';
import { CommentsPost } from '../../../shared/models/post.model/comments-post.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {

  constructor(private http: HttpClient) {}

  getByPostId(postId: number): Observable<CommentsPost[]> {
    return this.http.get<CommentsPost[]>(`/comments?postId=${postId}`);
  }

  create(comment: Omit<CommentsPost, 'id'>): Observable<CommentsPost> {
    return this.http.post<CommentsPost>('/comments', comment);
  }
}