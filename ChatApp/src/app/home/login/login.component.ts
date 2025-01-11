import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { VerifyOtpComponent } from '../../shared/verify-otp/verify-otp.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, VerifyOtpComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isOtp:boolean=false;
  email:any
  constructor(private auth:AuthService){
  }
  ngOnInit(): void {
    this.isOtp=location.href.split('/').includes('verify')
  }
  router=inject(Router)

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  })

onLogin(){
  this.isOtp=!this.isOtp

    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe((res:any)=>{
        this.email=res.email
        alert(res.message)
      },(err:any)=>{
        alert(err.error.message)
      })
    }
}

backTologin(event:any){
  this.isOtp=event.value
}

}
