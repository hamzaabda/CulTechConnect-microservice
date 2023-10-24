import { Component, OnInit } from '@angular/core';
import { BlogForm } from './bloglist.model';
import { BloglistService } from './bloglist.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss']
})
export class BloglistComponent implements OnInit {
  blog: BlogForm = new BlogForm();
   // bread crumb items
   breadCrumbItems: Array<{}>;
  constructor(private bloglistService: BloglistService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Blog' }, { label: 'Blog List', active: true }];

  }
  submitBlog(blog: BlogForm): void {
    this.bloglistService.createblog(this.blog).subscribe((event) => {
      console.log('Événement créé avec succès:', event);
      // Vous pouvez ajouter des actions supplémentaires ici
      Swal.fire({
        icon: 'success',
        title: 'Événement créé avec succès',
        text: 'Événement créé avec succès!',
        footer: '<a href="/blog/grid">Liste</a>'
      })
      
    });
  }
}