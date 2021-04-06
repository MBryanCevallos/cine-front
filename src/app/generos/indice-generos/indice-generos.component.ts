import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { generoDTO} from '../genero';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit{
  constructor(private generoService: GenerosService) { } // aqui en el construtor llamamos al servicio
 generos: generoDTO[];
 columnasAMostrar = ['id', 'nombre', 'acciones'];
  ngOnInit(): void {
    this.generoService.obtenerTodos() // listamos
    .subscribe(generos => { // nos subcribimos al observable
      this.generos = generos;
    }, error => console.error(error)); // buena practica retornar error si el web api da error
  }

}
