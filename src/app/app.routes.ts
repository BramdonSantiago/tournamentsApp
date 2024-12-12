import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TournamentsPageComponent } from './pages/tournaments-page/tournaments-page.component';
import { TournamentDetailPageComponent } from './pages/tournament-detail-page/tournament-detail-page.component';
import { TournamentFormPageComponent } from './pages/tournament-form-page/tournament-form-page.component';
import { authGuard } from './guards/auth.guard';

  

export const routes: Routes = [
    {
        path: 'tournaments',
        loadComponent: () => import('./pages/tournaments-page/tournaments-page.component').then(m => m.TournamentsPageComponent)
      },
      {
        path: 'tournament-detail/:id',
        loadComponent: () => import('./pages/tournament-detail-page/tournament-detail-page.component').then(m => m.TournamentDetailPageComponent)
      },
      {
        path: 'tournament-create-form',
        loadComponent: () => import('./pages/tournament-form-page/tournament-form-page.component').then(m => m.TournamentFormPageComponent)
      },
      {
        path: 'tournament-edit-form/:id',
        loadComponent: () => import('./pages/tournament-form-page/tournament-form-page.component').then(m => m.TournamentFormPageComponent)
      },
      {
        path: 'statistics',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/statistics-page/statistics-page.component').then(m => m.StatisticsPageComponent)
      },
      {
        path: 'organizations',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/organizations-page/organizations-page.component').then(m => m.OrganizationsPageComponent)
      },
      { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
];
