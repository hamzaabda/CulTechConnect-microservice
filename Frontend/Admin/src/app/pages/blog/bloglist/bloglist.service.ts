import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogForm } from './bloglist.model';

@Injectable({
  providedIn: 'root'
})
export class BloglistService {
  private baseUrl = 'http://localhost:9000/api/blog/blog-posts';
  constructor(private http: HttpClient) { }

  createblog(blog: BlogForm): Observable<BlogForm> {
    return this.http.post<BlogForm>(`${this.baseUrl}/add`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}