import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  titulo = 'contactenos'; 
  isAunteticado: boolean = false;

  alternarAuntenticacion(): void {
    this.isAunteticado = !this.isAunteticado;
  }
}
