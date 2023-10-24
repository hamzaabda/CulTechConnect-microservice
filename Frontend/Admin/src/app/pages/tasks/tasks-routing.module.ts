import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'kanban',
        component: KanbanboardComponent
    },
    {
        path: 'create',
        component: CreatetaskComponent        , canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN'] }

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }
