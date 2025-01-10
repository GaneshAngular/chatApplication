import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
   otp:string = ''
  @Input() isOtp:any
  @Input() email:any
  @Output() changeOtp=new EventEmitter<boolean>();
authService=inject(AuthService)
  backTologin(){
    this.changeOtp.emit(!this.isOtp)
  }
  verify(){
       if(this.otp.trim() && typeof Number(this.otp.trim())=='number' ){
        this.authService.verifyOtp({otp:this.otp,email:this.email}).subscribe((res:any)=>{
          if(res.message){
            alert(res.message)
            this.changeOtp.emit(!this.isOtp)
          }
        },((err:any)=>{
             alert(err.error.message)
        }))
       }else{
         alert('OTP cannot be empty')
       }
  }

}


