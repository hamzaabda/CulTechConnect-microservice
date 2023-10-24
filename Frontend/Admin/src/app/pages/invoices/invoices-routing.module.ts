import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent
        , canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN'] }      

    },
    {
        path: 'detail',
        component: DetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoicesRoutingModule {}
