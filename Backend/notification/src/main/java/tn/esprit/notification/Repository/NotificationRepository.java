package tn.esprit.notification.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import tn.esprit.notification.Entities.ChatNotification;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends MongoRepository<ChatNotification, Integer> {
    // Custom query methods, if needed

    @Query("{ 'timestamp' : { $gte: ?0, $lte: ?1 } }")
    List<ChatNotification> findNotificationsWithinLast24Hours(LocalDateTime start, LocalDateTime end);

}
