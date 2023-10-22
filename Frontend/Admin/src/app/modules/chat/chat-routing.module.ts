import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChathistoryComponent } from './chathistory/chathistory.component';

const routes: Routes = [
  {     path:'chat',
        component:ChatComponent
    },
    {     path:'chathistory',
    component:ChathistoryComponent
}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule { }