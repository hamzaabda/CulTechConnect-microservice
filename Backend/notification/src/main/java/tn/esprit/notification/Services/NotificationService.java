package tn.esprit.notification.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;
import tn.esprit.notification.Entities.ChatNotification;
import tn.esprit.notification.Entities.ChatNotificationSequence;
import tn.esprit.notification.Repository.ChatNotificationSequenceRepository;
import tn.esprit.notification.Repository.NotificationRepository;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private MongoOperations mongoOperations;

    @Autowired
    private NotificationRepository notificationRepository;


    @Autowired
    private ChatNotificationSequenceRepository sequenceRepository;

    public Integer getNextSequence() {
        ChatNotificationSequence sequence = sequenceRepository.findById("chat_notification_sequence").orElseGet(() -> {
            ChatNotificationSequence newSequence = new ChatNotificationSequence();
            newSequence.setId("chat_notification_sequence");
            newSequence.setSequence(1);
            return sequenceRepository.save(newSequence);
        });

        Integer next = sequence.getSequence();
        sequence.setSequence(next + 1);
        sequenceRepository.save(sequence);

        return next;
    }




    public ChatNotification saveChatNotification(ChatNotification chatNotification) {
        if (chatNotification.getId() == 0) {
            chatNotification.setId(getNextSequence());
        }
        return mongoOperations.save(chatNotification);
    }

    public List<ChatNotification> findNotificationsWithinLast24Hours() {

        return notificationRepository.findAll();
    }

    public void deleteAllNotifications() {
        notificationRepository.deleteAll();
    }


}