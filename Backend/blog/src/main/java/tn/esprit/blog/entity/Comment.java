package tn.esprit.blog.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tn.esprit.blog.entity.BlogPost;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(name = "blog_post_id")
    @JsonBackReference
    private BlogPost blogPost;

    @Column(nullable = false)
    private Date createdDate;

    // Getters and setters

    // Constructors
}
