import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent  implements OnInit{


  constructor(private authService:AuthService,private router:Router){

  }

  signupForm:FormGroup=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z\\s]{2,}$')]),
      email:new FormControl('',[Validators.required,Validators.email]),
      mobile:new FormControl('',[Validators.required,Validators.pattern('^\s?[0-9]{10}$')])
  })

  ngOnInit(): void {

  }

  onSignup(){
    if(this.signupForm.valid){
       this.authService.signup(this.signupForm.value).subscribe((res:any)=>{
         alert(res.message)
         this.router.navigate(['/login'])
       },(err:any)=>{
         alert(err.error.message)
       })
     }else{
    }
  }

}
