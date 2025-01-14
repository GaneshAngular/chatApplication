import {  Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatComponent } from '../../shared/chat/chat.component';
import { SocketService } from '../../core/services/socket-io/socket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  self: any;
  viewProfile: boolean = false;
  contacts: any[] = [];
  searchText: string = '';
  messages: any[] = [];
  reciever: any;
  selectedFile: any;
  isEditProfile: boolean = false;
  isEditDetail: boolean = false;

  @ViewChild('name') name:any
  @ViewChild('about') about:any
  constructor(
    private userService: UsersService,
    private socketService: SocketService
  ) {
    this.getConatacts();
    this.getUsers();
  }
  profileForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+')]),
    about:new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  this.getProfile()
    this.socketService.on('privateMessage', (data: any) => {
      this.messages = data;

      console.log(data);
    });
  }

    getProfile(){
    this.userService.getProfile().subscribe((data: any) => {
      this.self = data;
      this.socketService.emit('setUser', this.self?._id);
    });
  }

  getUsers() {
    let params = new HttpParams();
    this.searchText ? params.set('name', this.searchText) : '';

    this.userService.getUsers(params).subscribe((users: any) => {
      this.users = users;
    });
  }

  getConatacts() {
    this.userService.getContacts().subscribe((contacts: any) => {
      this.reciever = contacts[0];
      this.contacts = contacts;
      this.getMessages(this.reciever?._id);
    });
  }
  getMessages(id: string) {
    const params = new HttpParams().set('id', id);
    this.userService.getMessage(params).subscribe((message: any) => {
      this.messages = message;
      console.log('user', message);
    });
  }

  openChat(id: string) {
    this.getReciever(id);
    this.getMessages(id);
  }

  getReciever(id: string) {
    const params = new HttpParams().set('id', id);
    this.userService.getUserById(params).subscribe((user: any) => {
      this.reciever = user;
      console.log(user);
    });
  }

  sendMessage(event: any) {
    // this.userService.sendMessage({message:event,receiver:this.reciever._id}).subscribe((res:any)=>{
    //   console.log(res);
    //  this.getMessages(new HttpParams().set('id',this.reciever._id))
    // })
    this.socketService.emit('sendMessage', {
      message: event,
      receiver: this.reciever._id,
    });
  }

  toggleProfile() {
    this.viewProfile = !this.viewProfile;
  }
  onFileSelect(event: any): void {
    console.log("file selected");

    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];

      console.log('Selected file:', this.selectedFile);
    }
  }

  updateProfileImage() {
    if (this.selectedFile) {

      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.userService.updateProfileImage(formData).subscribe((data:any)=>{
          alert(data.message)
      },(err:any)=>{
        alert(err.error.message)
      })
    }
  }
  updatePersonalDetails() {
     const name=this.name.nativeElement.value
     const about=this.about.nativeElement.value
     const data={name:name, about:about}
      this.userService.updateProfileDetail(data).subscribe((data:any)=>{
          alert(data.message)
          this.isEditDetail=false
        this.getProfile()
  })
}
  toggleEditProfile() {
    this.isEditProfile = !this.isEditProfile;
  }
  toggleEditDetail() {
    this.isEditDetail = !this.isEditDetail;
  }

  logout(){
      localStorage.removeItem('token')
      location.reload()
  }
}
