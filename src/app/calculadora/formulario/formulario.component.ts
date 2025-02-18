import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  operadorA: number = 0;
  operadorB: number = 0;

  @Output() resultado = new EventEmitter<number>();

  calcular() {
    this.resultado.emit(this.operadorA + this.operadorB);
  }

}
