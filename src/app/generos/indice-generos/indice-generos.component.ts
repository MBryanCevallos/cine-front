import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  constructor(private generoService: GenerosService) { } // aqui en el construtor llamamos al servicio

  ngOnInit(): void {
    this.generoService.obtenerTodos() // listamos
    .subscribe(generos => { // nos subcribimos al observable
      console.log(generos);
    }, error => console.error(error)); //buena practica retornar error si el web api da error
  }

}
