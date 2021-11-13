import { Component, OnInit } from '@angular/core';
import { Parcel, Post } from 'src/app/models/parcel';
import { NewParcel } from 'src/app/models/newParcel';
import { PostService } from 'src/app/services/post.service';
import { ParcelService } from 'src/app/services/parcel.service';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.css']
})
export class ParcelComponent implements OnInit {

  private parcelService: ParcelService;
  private postService: PostService;
  

  constructor(parcelService: ParcelService, postService: PostService) { 
    this.parcelService = parcelService;
    this.postService = postService;
  }

  public id: number ;
  public nameSurname: string;
  public phone: string;  
  public weight: number;
  public postId: number;
  public postTown: string
  public postSelected: number;
  
  public parcels: Parcel[] = [];
  public valueCreated: NewParcel[] = [];
  public posts: Post[] = [];

  public hideMode: boolean = true;
  public editMode: boolean = false;

  ngOnInit(): void {
    this.getData();
    this.getPostsData();
  }

  public getData(): void{
    this.parcelService.getParcels().subscribe((getParcelsById) => {
      this.parcels = getParcelsById;
    })
  }

  public getPostsData(): void{
    this.postService.getPosts().subscribe((postsFromApi) => {
      this.posts = postsFromApi.sort((a, b) => (a.town > b.town) ? 1 : -1);
    })
  }

  updatedPost(value: string): void {
    this.getPostsData();
  }

  public selectedPost(selectedHorseId: number): void{
    if(selectedHorseId == 0){
      this.getData();
    }
    this.parcelService.getParcelsByPostId(selectedHorseId).subscribe((parcelsFromApi) => {
      this.parcels = parcelsFromApi;
    })
  }

  public addParcel(): void{
    let newParcel: NewParcel = {
      id: this.id,
      nameSurname: this.nameSurname,
      phone: this.phone,
      weight: this.weight,
      postId: this.postId,      
    }

    this.parcelService.addParcel(newParcel).subscribe((parcelsFromApi) => {
      newParcel.id = parcelsFromApi;
      this.valueCreated.push(newParcel);
      this.getData();
    })

    this.resetValues();
    this.hideMode = true;
  }

  deleteParcel(id: number): void{
    this.parcelService.deleteParcel(id).subscribe(()=> {
      let index = this.parcels.map(b => b.id).indexOf(id);
      this.parcels.splice(index, 1);
    })
  }

  loadParcel(parcel: Parcel): void {    
    this.hideMode = false;
    this.editMode = true;
  
    this.id = parcel.id;
    this.nameSurname = parcel.nameSurname;
    this.phone = parcel.phone;
    this.weight = parcel.weight;
    this.postId = parcel.postId;  
  }

  sendUpdatedParcel(): void {
    var updatedValue: NewParcel = {
      id: this.id,
      nameSurname: this.nameSurname,
      phone: this.phone,
      weight: this.weight,
      postId: this.postId
    }

  this.parcelService.updateParcel(updatedValue).subscribe(()=>{
    this.getData();
    })

  this.resetValues();
  
  this.hideMode = true;
  this.editMode = false;
  }

  resetValues(): void{
    this.nameSurname = "";
    this.phone = "";
    this.weight = null;
    this.postId = null;
  }
}
