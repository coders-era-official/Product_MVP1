import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
        data: { animation: 'home' },
      },
      {
        path: 'docs',
        loadComponent: () => import('./pages/docs/docs.component').then((m) => m.DocsComponent),
        data: { animation: 'docs' },
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
        data: { animation: 'about' },
      },
      {
        path: 'setup',
        loadChildren: () => import('./modules/setup/setup.module').then((m) => m.SetupModule),
        data: { animation: 'setup' },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
