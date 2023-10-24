import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloggrid',
  templateUrl: './bloggrid.component.html',
  styleUrls: ['./bloggrid.component.scss']
})
export class BloggridComponent implements OnInit {
 // bread crumb items
 breadCrumbItems: Array<{}>;
  listPost :any = [];
  Comments : any = 0;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    console.log('ras zebi !!!!');
    this.getallcommentsCount();
    this.getallposts();
    this.breadCrumbItems = [{ label: 'Blog' }, { label: 'Blog Grid', active: true }];

  }
  getallposts(){
    this.http.get('http://localhost:9000/api/blog/blog-posts/all')
    .subscribe((data) => {
      console.log('blog',data);
      this.listPost = data;
      
    });
  }
 getallcommentsCount(){
  this.http.get('http://localhost:9000/api/blog/api/comments/count')
  .subscribe((data) => {
    console.log('blog',data);
    this.Comments = data;
    
  });
 }
 getDateOnly(dateString: string): string {
  return dateString.split('T')[0];
}
}
