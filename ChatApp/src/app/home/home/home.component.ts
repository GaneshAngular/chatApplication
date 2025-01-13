import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../../shared/chat/chat.component';
import { SocketService } from '../../core/services/socket-io/socket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    users:any[]=[]
    self:any
    contacts:any[]=[]
     searchText:string = ''
     messages:any[]=[]
     reciever:any
    constructor(private userService:UsersService,private socketService:SocketService){
      this.getConatacts()
      this.getUsers()

    }

    ngOnInit(): void {
      this.userService.getProfile().subscribe((data:any)=>{
        this.self=data
        this.socketService.emit('setUser',this.self?._id)
      })
      this.socketService.on('privateMessage',(data:any)=>{
       this.messages= data

        console.log(data);



      })
    }



    getUsers(){
      let params=new HttpParams()
      this.searchText?params.set('name',this.searchText):''

      this.userService.getUsers(params).subscribe((users:any)=>{
        this.users=users

      })
    }

    getConatacts(){
      this.userService.getContacts().subscribe((contacts:any)=>{
        this.reciever=contacts[0]
        this.contacts=contacts
     this.getMessages(this.reciever?._id)

      })
    }
    getMessages(id:string){
      const params=new HttpParams().set('id',id);
      this.userService.getMessage(params).subscribe((message:any)=>{
        this.messages=message
  console.log("user",message);

      })
    }

    openChat(id:string){
       this.getReciever(id)
        this.getMessages(id)
    }

    getReciever(id:string){
      const params=new HttpParams().set('id',id);
      this.userService.getUserById(params).subscribe((user:any)=>{
        this.reciever=user
        console.log(user);

   })
    }



    sendMessage(event:any){
        // this.userService.sendMessage({message:event,receiver:this.reciever._id}).subscribe((res:any)=>{
        //   console.log(res);
        //  this.getMessages(new HttpParams().set('id',this.reciever._id))
        // })
        this.socketService.emit('sendMessage',{message:event,receiver:this.reciever._id})

    }
}
