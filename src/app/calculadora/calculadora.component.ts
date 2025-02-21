import { Component } from '@angular/core';
import { FormularioComponent } from "./formulario/formulario.component";

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [FormularioComponent],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {
  titulo = 'Aplicaion Calculadora';

  result: number = 0;

  recibirCalculo(calculo: number) {
    this.result = calculo;
  }

}
