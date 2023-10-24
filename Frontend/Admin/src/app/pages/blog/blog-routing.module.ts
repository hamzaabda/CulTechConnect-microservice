import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BloggridComponent } from './bloggrid/bloggrid.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { DetailComponent } from './detail/detail.component';

import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
const routes: Routes = [
    {
        path: 'list',
        component: BloglistComponent
        , canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN'] }

    },
    {
        path: 'grid',
        component: BloggridComponent

    },
    {
        path: 'detail/:id',
        component: DetailComponent
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,FormsModule
    ],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
