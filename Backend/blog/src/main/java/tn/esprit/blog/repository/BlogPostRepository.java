package tn.esprit.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.blog.entity.BlogPost;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}
