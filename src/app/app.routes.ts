import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

export const routes: Routes = [
    {
        path: '',
        component: UsersListComponent,
    },
    {
        path: 'user/new',
        component: UserAddComponent
    },
    {
        path: 'user/edit/:id',
        component:UserEditComponent
    }
];
