export interface NewParcel {
    id?: number;
    nameSurname: string;    
    weight: number;
    phone: string;
    postId?: number | null; 
    postTown?: string  
}