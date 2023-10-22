package tn.esprit.Chat.entities;


import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatNotification {
    @Id
    private Integer id;
    private String message;
    private String sender;
    private LocalDateTime timestamp;
}
