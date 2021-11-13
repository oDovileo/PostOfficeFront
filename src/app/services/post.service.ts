import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Post} from'../models/post';

@Injectable({
    providedIn: 'root'
  })
  export class PostService {
  
    private http: HttpClient;
  
    constructor(http: HttpClient) { 
      this.http = http;
    }

    public getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>("https://localhost:44342/Post");
      }
    
      public addPost(post: Post): Observable<Post> {
        return this.http.post<Post>("https://localhost:44342/Post", post);
      }
    
      public updatePost(post: Post): Observable<unknown> {
        return this.http.put(`https://localhost:44342/Post`, post);
      }
    
      public deletePost(id: number): Observable<unknown> {
        return this.http.delete(`https://localhost:44342/Post/${id}`);
      }
    }