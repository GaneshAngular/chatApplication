import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    users:any[]=[]
    contacts:any[]=[]
     searchText:string = ''
    constructor(private userService:UsersService){
      this.getUsers()
      this.getConatacts()
    }

    getUsers(){
      let params=new HttpParams()
      this.searchText?params.set('name',this.searchText):''

      this.userService.getUsers(params).subscribe((users:any)=>{
        this.users=users
        console.log(users);

      })
    }

    getConatacts(){
      this.userService.getContacts().subscribe((contacts:any)=>{
        this.contacts=contacts
        console.log(contacts);

      })
    }
}
