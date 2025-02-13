import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent {
  
  isOpen = false;
  messages: string[] = [];
  newMessage = '';

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }

}
