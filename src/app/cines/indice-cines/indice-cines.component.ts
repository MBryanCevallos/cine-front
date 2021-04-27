import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent implements OnInit {
constructor(private cineService: CinesService) { } // aqui en el construtor llamamos al servicio F2 para renombrar

cines: cineDTO[];
 columnasAMostrar = ['id', 'nombre', 'acciones'];
 cantidadTotalRegistros;
 paginaActual = 1;
 cantidadRegistrosAMostrar = 10;
  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.cineService.obtenerTodos(pagina, cantidadElementosAMostrar) // listamos
    // .subscribe(generos => { // nos subcribimos al observable
    .subscribe((respuesta: HttpResponse<cineDTO[]>) => {
       this.cines = respuesta.body;
       console.log(respuesta.headers.get('cantidadTotalRegistros'));
       this.cantidadTotalRegistros = respuesta.headers.get('cantidadTotalRegistros');
     }, error => console.error(error)); // buena practica retornar error si el web api da error
  }
  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  borrar(id: number){
    this.cineService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar); // para carga la pagina nuevamente
    }, error => console.error(error));
  }

}
