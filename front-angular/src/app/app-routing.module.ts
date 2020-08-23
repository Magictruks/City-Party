import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/admin-panel/dashboard/dashboard.component';
import { CategoriesComponent } from './components/admin-panel/categories/categories.component';
import { EventsComponent } from './components/admin-panel/events/events.component';
import { LoginComponent } from './components/admin-panel/login/login.component';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './components/admin-panel/users/users.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'events', component: EventsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
