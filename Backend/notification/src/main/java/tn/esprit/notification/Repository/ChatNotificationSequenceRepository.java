package tn.esprit.notification.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.notification.Entities.ChatNotificationSequence;

public interface ChatNotificationSequenceRepository extends MongoRepository<ChatNotificationSequence, String> {
}

