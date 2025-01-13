import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {


  @Input() reciever:any
  @Input() messages:any[]=[]
  @Output() sendMessage=new EventEmitter()
   message:string=''



   onSendMessage(){
     this.sendMessage.emit(this.message)
    //  console.log(this.message);

     this.message=''
   }
}
