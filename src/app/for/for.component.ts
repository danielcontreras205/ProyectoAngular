import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-for',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './for.component.html',
  styleUrl: './for.component.css'
})
export class ForComponent {
  titulo = 'Directiva @for en Angular';
  tareas: string[] =[
    'Aprender Angular',
    'Desarrollar una app',
    'Aprender typeScript'
  ];

  agregarTarea(nuevaTarea: string): void{
    if(nuevaTarea){
      this.tareas.push(nuevaTarea);
    }
  }
}
