package tn.esprit.notification.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.notification.Entities.ChatNotification;
import tn.esprit.notification.Repository.NotificationRepository;
import tn.esprit.notification.Services.NotificationService;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@RestController
@RequestMapping("/")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;



    @PostMapping("/addnotification")
    public ResponseEntity<ChatNotification> createNotification(@RequestBody ChatNotification chatNotification)
    {
        return new ResponseEntity<ChatNotification>(notificationService.saveChatNotification(chatNotification), HttpStatus.OK);
    }


    @GetMapping("/last24hoursnotifications")
    public ResponseEntity<List<ChatNotification>> findNotificationsWithinLast24Hours() {

        return new ResponseEntity<List<ChatNotification>>(notificationService.findNotificationsWithinLast24Hours(), HttpStatus.OK);
    }

//    public void deleteAllNotifications() {
//        notificationRepository.deleteAll();
//    }



}
