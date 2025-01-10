import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { USER_LOGIN, USER_SIGNUP, VERIFY_OTP } from '../../constants/Urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService:HttpService) { }

    login(data:any){
      return this.httpService.post(USER_LOGIN,data)
    }

    signup(data:any){
       return this.httpService.post(USER_SIGNUP,data)
    }

    verifyOtp(otp:any){
        return this.httpService.post(VERIFY_OTP,otp)
    }
}
