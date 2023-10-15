import { Component, OnInit, ViewChild } from '@angular/core';
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { ChatMessage, ChatUser } from './chat.model';
import { chatData, chatMessagesData } from './data';
import { stringify } from 'querystring';
import { ChatData } from 'src/app/pages/dashboards/saas/data';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ChatService } from '../chat.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatMessagesData: ChatMessage[];
  @ViewChild('scrollEle') scrollEle;
  @ViewChild('scrollRef') scrollRef;
    formData: FormGroup;
    userName:string = "";
    connecteduser;
    private chatStompClient;
    chatSubmit: boolean;
    chatData: ChatUser[];
    user;

  private chatServerUrl = "http://localhost:8082/connect";

  constructor(private Authservice:AuthService,
    public formBuilder: FormBuilder,
    private ChatService:ChatService,
    private userservice:UsersService) { }

  ngOnInit(): void {

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this._fetchData();

this.connectSocket()


  }

  connectSocket()
  {
    if(localStorage.getItem('access_token') !== null || localStorage.getItem('refresh_token') !== null)
    {
    const access_token  = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    interface DecodedToken {
      sub: string;
      Role: string; 
      exp : string;
      iat: string;
    }
      const decoded: DecodedToken = jwtDecode(access_token);
      const sub = decoded.sub;
      const roles = decoded.Role;
      const exp = decoded.exp;
      const iat = decoded.iat;
      console.log(sub + roles + exp + iat);
      this.Authservice.getuserbyemail(sub).subscribe(
        (data) => {
          this.connecteduser = data
          console.log(data?.id)
          
          console.log(data?.username)
          console.log(data?.email)
          console.log(data?.nom)
          console.log(data?.prenom)
          console.log(data?.isEnabled)
          this.userName=data?.username;

          let chatWS = new SockJS(this.chatServerUrl);
          this.chatStompClient = Stomp.over(chatWS);
          // this.chatStompClient.connect({}, (frame) => {

          //   if (frame && frame.command === 'CONNECTED') {
          //     console.log('WebSocket connection is open and ready.');
          //     // Do something when the connection is established.
          //   } else {
          //     console.log('WebSocket connection failed.');
          //     // Handle connection failure or other cases.
          //   }
          // });

          this.chatStompClient.connect({}, () => {
            this.connectedDone();
          });
                    
        }

      );
    }
    // else{
    //   this.connecteduser = null;
    //   this.userName = null;
    // }
  }


  connectedDone()
  {
    this.chatStompClient.subscribe("/topic/all",this.sendMessage)

    this.chatStompClient.send("/app/chat.logIn",{},
    JSON.stringify({sender: this.userName,chatType: 'JOIN'})
    )
  }

  sendMessage(payload: any) {
    var message = JSON.parse(payload.body); 
    if (message.chatType === "JOIN") {

      console.log("Message sender" , message.sender)
      
      
      chatMessagesData.push({
          name: message.sender,
          message: 'JOIN',
          time: 'JOIN',
      });

      console.log("JOOOOIN")

    }else if (message.chatType === "LEAVE")
    {
      chatMessagesData.push({
        name: message.sender,
        message: 'LEAVE',
        time: 'LEAVE',
    });
    }

    else{
      const currentDate = new Date();

      chatMessagesData.push({
        name: message.sender,
        message: message.message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes(),
    });

    }


  }
   messageSave() {
    var messageUser = this.formData.get('message').value;
    const currentDate = new Date();
    if (this.formData.valid && messageUser && this.chatStompClient) {
      // Message Push in Chat
      var userMessage = {
        align: 'left',
        message : messageUser,
        chatType : 'CHAT',
        sender : this.userName
      } 

      this.chatStompClient.send("/app/chat.send",{},JSON.stringify(userMessage))

      // this.chatMessagesData.push({
      //   align: 'right',
      //   name: this.userName,
      //   message : messageUser,
      //   time: currentDate.getHours() + ':' + currentDate.getMinutes()
      // });
      this.onListScroll();
      messageUser ='';

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null
      });
    }

    this.chatSubmit = true;
  }

  private _fetchData() {
    this.chatMessagesData = chatMessagesData;
    this.chatData = chatData;
  
    this.ChatService.getactiveUsers().subscribe((data) => {
      this.chatData = []; // Clear the existing user list
  
      const usernamesSet = new Set<string>(); // Create a Set to store unique usernames
  
      data.forEach((element) => {
        const username = element.username;
  
        this.userservice.getUserByusername(username).subscribe(
      
            (data)=>{
        this.user = data
        const rolesname = [] ;
        this.user.roles.forEach(element => {
          rolesname.push(element.nameRole);
          
        });

        // Check if the username is not already in the Set
        if (!usernamesSet.has(username)) {
          this.chatData.push({
            image: this.user.profileimageurl,
            name: username,
            message: rolesname.toString(),
            time: '01 min',
            color: 'success',
          });
  
          // Add the username to the Set to prevent duplicates
          usernamesSet.add(username);
        }       
              
            }
      
          )
        






      });
    });
  }
  

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }
  
  ngAfterViewInit() {
    this.scrollEle.SimpleBar.getScrollElement().scrollTop = 100;
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 200;
  }


   chatUsername(name) {

  }




}
