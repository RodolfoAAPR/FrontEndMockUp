import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { UsersComponent } from './features/users/users.component';

export const routes: Routes = [
    { path: '**', redirectTo: 'home'},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent }
];
