import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { SERVER_URL } from '../../constants/Urls';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

   get(url:string,params?:Params){
     return this.http.get(SERVER_URL+url,{params})
   }
   post(url:string,data:any){
     return this.http.post(SERVER_URL+url,data)
   }
   put(url:string,data:any,params?:Params){
        return this.http.put(SERVER_URL+url,data,params)
   }

   delete(url:string,params:Params){
      return this.http.delete(SERVER_URL+url,params)
   }

   secureGet(url:string,params:Params,token:string){
       return this.http.get(SERVER_URL+url,{params,headers: {Authorization: `Bearer ${token}`}})
   }

   securePost(url:string,data:any,token:string){
      return this.http.post(SERVER_URL+url,data,{headers:{Authorization:`Bearer ${token}`}})
   }

   securePut(url:string,data:any,params:Params,token:string){
     return this.http.put(SERVER_URL+url,data,{params,headers:{Authorization:`Bearer ${token}`}})
   }

   secureDelete(url:string,params:Params,token:string){
     return this.http.delete(SERVER_URL+url,{params,headers:{Authorization:`Bearer ${token}`}})
   }

}
