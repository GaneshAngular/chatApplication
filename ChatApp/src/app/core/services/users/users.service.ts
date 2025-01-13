import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Params } from '@angular/router';
import { GET_CONTACTS, GET_MESSAGE, GET_PROFILE, GET_USERS, GET_USERS_BY_ID, SEND_MESSAGE } from '../../constants/Urls';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpServie:HttpService) { }

   getUsers(params:HttpParams){
   return this.httpServie.get(GET_USERS,params)
   }

   getContacts(){
    return this.httpServie.get(GET_CONTACTS)
   }

   sendMessage(data:any){
    return this.httpServie.post(SEND_MESSAGE,data)
   }

   getMessage(params:HttpParams){
      return this.httpServie.get(GET_MESSAGE,params)
   }

   getUserById(params:HttpParams){
     return this.httpServie.get(GET_USERS_BY_ID,params)
   }

   getProfile(){
     return this.httpServie.get(GET_PROFILE)
   }
}
