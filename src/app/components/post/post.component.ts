import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { PostService} from 'src/app/services/post.service';
import { Post} from 'src/app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Output() updatedPost = new EventEmitter();

  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
   }
  public id: number; 
  public town: string;
  public capacity: number;
  public code:string;

  public posts: Post[] = [];

  public hideMode: boolean = true;
  public editMode: boolean = false;


  ngOnInit(): void {
    this.getData();
  }

  public getData(): void{
    this.postService.getPosts().subscribe((postFromApi) => {
      this.posts = postFromApi;
    })
  }

  public addPost(): void {
    let newPost: Post = {
      id: this.id,           
      town: this.town,
      capacity: this.capacity,    
      code: this.code
    }

    this.postService.addPost(newPost).subscribe((postId) => {
      this.posts.push(newPost); 
      newPost = postId;             
    })
    this.resetValues();
    this.hideMode = true;
  }
    
  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(()=> {
      let index = this.posts.map(h => h.id).indexOf(id);
      this.posts.splice(index, 1);
      this.updatedPost.emit("");
    })
  }

  loadPost(post: Post): void {    
    this.hideMode = false;
    this.editMode = true;
  
    this.id = post.id;             
    this.town= this.town;
    this.capacity= this.capacity;    
    this.code= this.code; 
  }

  sendUpdatedPost(): void {
    var updatedValue: Post = {
      id: this.id,
      town: this.town,
      capacity: this.capacity,            
      code: this.code
    }

  this.postService.updatePost(updatedValue).subscribe(()=>{
      this.getData();
      this.updatedPost.emit("");
      })
  
  this.resetValues();

  this.hideMode = true;
  this.editMode = false;  
  }

  resetValues(): void{
    this.town = "";
    this.capacity = null;       
    this.code = "";
  }
}
