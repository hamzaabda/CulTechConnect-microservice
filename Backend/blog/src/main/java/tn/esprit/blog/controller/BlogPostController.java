package tn.esprit.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.blog.entity.BlogPost;
import tn.esprit.blog.entity.Category;
import tn.esprit.blog.entity.Comment;
import tn.esprit.blog.service.BlogPostService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/blog-posts")

public class BlogPostController {
    private BlogPostService blogPostService;


    @Autowired
    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @GetMapping("/all")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<BlogPost> getAllBlogPosts() {
        return blogPostService.getAllBlogPosts();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public BlogPost getBlogPostById(@PathVariable Long id) {
        return blogPostService.getBlogPostById(id);
    }

    @PostMapping("/add")
    public BlogPost createBlogPost(@RequestBody BlogPost blogPost) {
        return blogPostService.createBlogPost(blogPost);
    }

    @PutMapping("/{id}")
    public BlogPost updateBlogPost(@PathVariable Long id, @RequestBody BlogPost updatedBlogPost) {
        return blogPostService.updateBlogPost(id, updatedBlogPost);
    }


    @DeleteMapping("/{id}")
    public void deleteBlogPost(@PathVariable Long id) {
        blogPostService.deleteBlogPost(id);
    }


    @GetMapping("/total-count")
    public ResponseEntity<Long> getTotalBlogAndCommentCount() {
        long total = blogPostService.getTotalBlogAndCommentCount();
        return ResponseEntity.ok(total);
    }

    @PostMapping("/{blogPostId}/assign-comment")
    @CrossOrigin(origins = "http://localhost:4200")
    public BlogPost assignCommentToBlogPost(
            @PathVariable Long blogPostId,
            @RequestBody Comment comment) {
        return blogPostService.assignCommentToBlogPost(blogPostId, comment);
    }

    @PostMapping("/{postId}/like")
    @CrossOrigin(origins = "http://localhost:4200")
    public BlogPost likePost(@PathVariable Long postId) {
        return blogPostService.likePost(postId);
    }

    @PostMapping("/{postId}/dislike")
    public BlogPost dislikePost(@PathVariable Long postId) {
        return blogPostService.dislikePost(postId);
    }
    @PostMapping("/{blogPostId}/add-categories")
    public BlogPost addCategoriesToBlogPost(
            @PathVariable Long blogPostId,
            @RequestBody Set<Category> categories
    ) {
        return blogPostService.addCategoriesToBlogPost(blogPostId, categories);
    }
}

