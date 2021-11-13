export interface Parcel {
    id?: number;
    nameSurname: string;    
    weight: number;
    phone: string;
    postId?: number | null; 
    postTown?: string  
}
export interface Post {
    id: number;
    town: string;
}