package tn.esprit.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.blog.entity.BlogPost;
import tn.esprit.blog.entity.Category;
import tn.esprit.blog.entity.Comment;
import tn.esprit.blog.repository.BlogPostRepository;
import tn.esprit.blog.repository.CommentRepository;

import java.util.List;
import java.util.Set;

@Service
public class BlogPostService {
    private BlogPostRepository blogPostRepository;
    private CommentRepository commentRepository;
    @Autowired
    public BlogPostService(BlogPostRepository blogPostRepository, CommentRepository commentRepository) {
        this.blogPostRepository = blogPostRepository;
        this.commentRepository = commentRepository;
    }

    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    public BlogPost getBlogPostById(Long id) {
        return blogPostRepository.findById(id).orElse(null);
    }

    public BlogPost createBlogPost(BlogPost blogPost) {
        return blogPostRepository.save(blogPost);
    }


    public BlogPost updateBlogPost(Long id, BlogPost updatedBlogPost) {
        if (blogPostRepository.existsById(id)) {
            updatedBlogPost.setId(id);
            return blogPostRepository.save(updatedBlogPost);
        }
        return null; // Gérer le cas où l'ID n'existe pas
    }
    public long getTotalBlogAndCommentCount() {
        long blogCount = blogPostRepository.count();
        long commentCount = commentRepository.count();
        return blogCount + commentCount;
    }

    public BlogPost assignCommentToBlogPost(Long blogPostId, Comment comment) {
        BlogPost blogPost = blogPostRepository.findById(blogPostId).orElse(null);

        if (blogPost != null) {
            comment.setBlogPost(blogPost);
            blogPost.getComments().add(comment);
            blogPostRepository.save(blogPost);
        }

        return blogPost;
    }
    public BlogPost likePost(Long postId) {
        BlogPost post = blogPostRepository.findById(postId).orElse(null);
        if (post != null) {
            post.setLikes(post.getLikes() + 1);
            return blogPostRepository.save(post);
        }
        return null;
    }

    public BlogPost dislikePost(Long postId) {
        BlogPost post = blogPostRepository.findById(postId).orElse(null);
        if (post != null) {
            post.setDislikes(post.getDislikes() + 1);
            return blogPostRepository.save(post);
        }
        return null;
    }

    public BlogPost addCategoriesToBlogPost(Long blogPostId, Set<Category> categories) {
        BlogPost blogPost = blogPostRepository.findById(blogPostId).orElse(null);

        if (blogPost != null) {
            blogPost.getCategories().addAll(categories);
            return blogPostRepository.save(blogPost);
        }
        return null;
    }


    public void deleteBlogPost(Long id) {
        blogPostRepository.deleteById(id);
    }







}
