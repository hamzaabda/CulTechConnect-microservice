package tn.esprit.notification.Entities;

import lombok.Data;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chat_notification_sequence")
@Data
public class ChatNotificationSequence {
    @Id
    private String id;
    private Integer sequence;
}