import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.scss']
})
export class ChathistoryComponent implements OnInit {

  userData: { [key: string]: any } = {}; // Store user data

  chatmessages24h: any;
  constructor(private service : ChatService,private userService : UsersService) { }

  ngOnInit(): void {
    this.service.getChatLogs().subscribe(
      (data) => {
        console.log(data); // Log the response data
        this.chatmessages24h = data;

        this.chatmessages24h.forEach(element => {

          this.userService.getUserByusername(element.sender).subscribe(

            (user)=>{
              console.log(data)
              this.userData[element.sender] = user;


            }

          )
          
        });
      }
    );
  }

  
  
  

}
