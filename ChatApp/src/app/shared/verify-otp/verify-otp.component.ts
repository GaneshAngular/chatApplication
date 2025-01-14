import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent implements OnInit {
   otp:string = ''
   expiryTime=30
  @Input() isOtp:any
  @Input() email:any
  @Output() changeOtp=new EventEmitter<boolean>();
authService=inject(AuthService)
router=inject(Router)
  // Countdown starts from 30
isOtpExpired: boolean = false;  // Flag to track OTP expiry
countdownInterval: any;
  backTologin(){
    this.changeOtp.emit(!this.isOtp)
  }

  ngOnInit(): void {
    this.expiryTime=30

    this.otpTimeOut()
  }

  verify(){
       if(this.otp.trim() && typeof Number(this.otp.trim())=='number' ){
        this.authService.verifyOtp({otp:this.otp,email:this.email}).subscribe((res:any)=>{
          if(res.message){
            localStorage.setItem('token',res.token)
            alert(res.message)
             this.router.navigate(['/home'])
          }
        },((err:any)=>{
             alert(err.error.message)
        }))
       }else{
         alert('OTP cannot be empty')
       }
  }

  otpTimeOut(){

    // Start the countdown timer using arrow function to maintain context of 'this'
    this.countdownInterval = setInterval(() => {
      this.expiryTime--;  // Decrease the time by 1 second

      // If the countdown reaches 0, stop the timer and show expired message
      if (this.expiryTime <= 0) {
        this.changeOtp.emit(!this.isOtp)
       
        // Stop the countdown when time reaches 0

        clearInterval(this.countdownInterval);
      }
    }, 1000);  // 1000


  }


  }




