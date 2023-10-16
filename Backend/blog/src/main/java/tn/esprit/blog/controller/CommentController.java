package tn.esprit.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.blog.entity.Comment;
import tn.esprit.blog.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }
    @GetMapping("/allcomments")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }
    @PostMapping("/add")
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }

    @GetMapping("/count")
    @CrossOrigin(origins = "http://localhost:4200")
    public long countComments() {
        return commentService.countComments();
    }
}
