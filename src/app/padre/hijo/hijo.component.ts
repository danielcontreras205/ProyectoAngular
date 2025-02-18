import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent {
  // !: operador non-null
  @Input()mensaje!: string;

  @Output() notificarPadre = new EventEmitter<string>();

  enviarMensaje() {
    this.notificarPadre.emit('Mensaje desde el componente hijo al padre')
  }

}
