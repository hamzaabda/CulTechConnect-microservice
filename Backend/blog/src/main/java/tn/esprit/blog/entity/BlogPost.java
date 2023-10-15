package tn.esprit.blog.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "blog_posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private Date createdDate;

    private int likes;

    private int dislikes;

    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "blogpost_category",
            joinColumns = @JoinColumn(name = "blogpost_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    private String imageUrl;
    // Getters and setters

    // Constructors
}
