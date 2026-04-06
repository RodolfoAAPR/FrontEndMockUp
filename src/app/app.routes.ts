import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { UsersComponent } from './features/users/users.component';
import { HomeComponent } from './features/home/home.component';
import { LotsComponent } from './features/lots/lots.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: 'lots', component: LotsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home'}
];
