import { Routes } from '@angular/router';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/post-list/post-list.page/post-list.page').then(m => m.PostListPage)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/post-detail/post-detail.page/post-detail.page').then(m => m.PostDetailPage)
  }
];