package tn.esprit.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.blog.entity.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}