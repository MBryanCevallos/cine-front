import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { generoDTO} from '../genero';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit{
  constructor(private generoService: GenerosService) { } // aqui en el construtor llamamos al servicio
 generos: generoDTO[];
 columnasAMostrar = ['id', 'nombre', 'acciones'];
 cantidadTotalRegistros;
 paginaActual = 1;
 cantidadRegistrosAMostrar = 10;
  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.generoService.obtenerTodos(pagina, cantidadElementosAMostrar) // listamos
    // .subscribe(generos => { // nos subcribimos al observable
    .subscribe((respuesta: HttpResponse<generoDTO[]>) => {
       this.generos = respuesta.body;
       console.log(respuesta.headers.get('cantidadTotalRegistros'));
       this.cantidadTotalRegistros = respuesta.headers.get('cantidadTotalRegistros');
     }, error => console.error(error)); // buena practica retornar error si el web api da error
  }
  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
}
