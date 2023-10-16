import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BloggridComponent } from './bloggrid/bloggrid.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { DetailComponent } from './detail/detail.component';

import { FormsModule } from '@angular/forms';
const routes: Routes = [
    {
        path: 'list',
        component: BloglistComponent
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
