import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { usuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css']
})
export class IndiceUsuariosComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) { } // aqui en el construtor llamamos al servicio
  usuarios: usuarioDTO[];
  columnasAMostrar = ['email', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
   ngOnInit(): void {
     this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
   }
   cargarRegistros(pagina: number, cantidadElementosAMostrar){
     this.seguridadService.obtenerUsuarios(pagina, cantidadElementosAMostrar) // listamos
     // .subscribe(generos => { // nos subcribimos al observable
     .subscribe((respuesta: HttpResponse<usuarioDTO[]>) => {
        this.usuarios = respuesta.body;
        console.log(respuesta.headers.get('cantidadTotalRegistros'));
        this.cantidadTotalRegistros = respuesta.headers.get('cantidadTotalRegistros');
      }, error => console.error(error)); // buena practica retornar error si el web api da error
   }
   actualizarPaginacion(datos: PageEvent){
     this.paginaActual = datos.pageIndex + 1;
     this.cantidadRegistrosAMostrar = datos.pageSize;
     this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
   }

   hacerAdmin(usuarioId: string){
     this.seguridadService.hacerAdmin(usuarioId)
     .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
   }
   removerAdmin(usuarioId: string){
    this.seguridadService.removerAdmin(usuarioId)
    .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
  }
}
