package tn.esprit.Chat.Controller;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import tn.esprit.Chat.model.ActiveUser;
import tn.esprit.Chat.model.ChatMessage;
import tn.esprit.Chat.model.Storage;

@Controller
public class ChatController {

    @MessageMapping("/chat.logIn")
    @SendTo("/topic/all")
    private ChatMessage logIn(@Payload ChatMessage chatMessge, SimpMessageHeaderAccessor headerAccessor)
    {
        headerAccessor.getSessionAttributes().put("username",chatMessge.getSender());
        Storage.activeUserList.add(new ActiveUser(chatMessge.getSender(), headerAccessor.getSessionId()));
        return chatMessge;
    }
    @MessageMapping("/chat.send")
    @SendTo("/topic/all")
    public ChatMessage send(@Payload ChatMessage chatMessage){
        return chatMessage;
    }

}
