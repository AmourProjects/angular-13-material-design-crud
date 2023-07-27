import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  postProduit(data:any){
    return this.http.post<any>('http://localhost:3000/listeProduits',data);
  }

  getProduit(){
    return this.http.get<any>('http://localhost:3000/listeProduits');
  }
  
  putProduit(data: any, id: number){
    return this.http.put<any>('http://localhost:3000/listeProduits/'+id,data);
  }
  
  deleteProduit(id: number){
    return this.http.delete<any>('http://localhost:3000/listeProduits/'+id);
  }
}
