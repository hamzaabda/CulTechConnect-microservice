package tn.esprit.notification.Entities;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "chat_notification")
public class ChatNotification {

    @Id
    private Integer id;
    private String message;
    private String sender;
    private LocalDateTime timestamp;



}
