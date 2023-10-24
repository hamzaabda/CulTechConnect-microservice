import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'list',
        component: UserlistComponent
        , canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN'] }
    },
    // {
    //     path: 'grid',
    //     component: UsergridComponent
    // },
    {
        path: 'profile',
        component: ProfileComponent
       
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }