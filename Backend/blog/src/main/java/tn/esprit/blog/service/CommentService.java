package tn.esprit.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.blog.entity.Comment;
import tn.esprit.blog.repository.CommentRepository;

import java.util.List;

@Service
public class CommentService {
    private CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }


    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }
    public long countComments() {
        return commentRepository.count();
    }

}
