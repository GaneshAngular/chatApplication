import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Params } from '@angular/router';
import { GET_CONTACTS, GET_MESSAGE, GET_USERS, SEND_MESSAGE } from '../../constants/Urls';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpServie:HttpService) { }

   getUsers(params:Params){
   return this.httpServie.get(GET_USERS,{params})
   }

   getContacts(){
    return this.httpServie.get(GET_CONTACTS)
   }

   sendMessage(data:any){
    return this.httpServie.post(SEND_MESSAGE,data)
   }

   getMessage(params:Params){
      return this.httpServie.get(GET_MESSAGE,{params})
   }
}
