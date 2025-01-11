import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { ChatComponent } from './shared/chat/chat.component';
import { VerifyOtpComponent } from './shared/verify-otp/verify-otp.component';
import { authenticateGuard } from './core/guard/authenticate/authenticate.guard';
import { isLoginGuard } from './core/guard/isLogIn/is-login.guard';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },{
    path:'home',
    component:HomeComponent,
    canActivate:[authenticateGuard],
     children:[
      {
        path:'',
        redirectTo:'chats',
        pathMatch:'full'
      },{
        path:'chats',
        component:ChatComponent
      }
     ],

  },{
     path:'login',
     component:LoginComponent,
     canActivate:[isLoginGuard]

  },{
    path:'signup',
    component:SignupComponent,
    canActivate:[isLoginGuard]
  }
];
