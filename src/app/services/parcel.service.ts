import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcel } from '../models/parcel';
import { NewParcel } from '../models/newParcel';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  private http: HttpClient;

  constructor(http: HttpClient) { 
    this.http = http;
  }

  public getParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>("https://localhost:44342/Parcel");
  }
  public getParcelById(id: number): Observable<Parcel> {
    return this.http.get<Parcel>(`https://localhost:44342/Parcel${id}`);
  }
  public getParcelsByPostId(postId: number): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(`https://localhost:44342/Parcel/${postId}`);
  }

   public addParcel(parcel: NewParcel): Observable<number> {
    return this.http.post<number>("https://localhost:44342/Parcel", parcel);
   }

  public updateParcel(parcel: NewParcel): Observable<Parcel> {
    return this.http.put<Parcel>(`https://localhost:44342/Parcel`, parcel);
   }

  public deleteParcel(id: number): Observable<unknown> {
    return this.http.delete(`hhttps://localhost:44342/Parcel/${id}`);
  }
}