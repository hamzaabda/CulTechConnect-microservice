package tn.esprit.Chat.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;
import tn.esprit.Chat.entities.ChatNotification;
import tn.esprit.Chat.model.ActiveUser;
import tn.esprit.Chat.model.ChatMessage;
import tn.esprit.Chat.model.Storage;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    @Autowired
    private RestTemplate restTemplate;

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


        ChatNotification chatNotification = new ChatNotification();
        chatNotification.setId(0);
        chatNotification.setMessage(chatMessage.getMessage());
        chatNotification.setSender(chatMessage.getSender());
        chatNotification.setTimestamp(LocalDateTime.now());

        restTemplate.postForObject("http://notification-container:9090/api/notification/addnotification", chatNotification, ChatNotification.class);


        return chatMessage;
    }

}
