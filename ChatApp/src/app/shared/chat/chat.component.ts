import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewChecked {

  @ViewChild('chatContainer') chatContainer: any;
  @ViewChild('scrollToEnd') scrollToEnd: any;
  @Input() reciever:any
  @Input() messages:any[]=[]
  @Output() sendMessage=new EventEmitter()
   message:string=''

   ngAfterViewChecked() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }


   onSendMessage(){
     this.sendMessage.emit(this.message)
    //  console.log(this.message);

     this.message=''
   }
}
