import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../../shared/models/post.model/post.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule   
  ],
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.css'],
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;

  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<number>();
  @Output() create = new EventEmitter<void>();
}
