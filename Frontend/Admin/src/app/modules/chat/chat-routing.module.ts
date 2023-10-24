import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChathistoryComponent } from './chathistory/chathistory.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {     path:'chat',
        component:ChatComponent
    },
    {    path:'chathistory',
        component:ChathistoryComponent
        ,canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN'] }
}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule { }