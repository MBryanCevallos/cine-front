import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor(private pelicuasService: PeliculasService) { }
  @Input()
  peliculas: PeliculaDTO[];

  @Output()
  borrado: EventEmitter<void> = new EventEmitter<void>();
  ngOnInit(): void {
   /* this.pelis =[{
      titulo: 'Spider-Man- from home / cine',
      fechaLanzamiento: new Date(),
      precio: 1400.99
    },
    {
      titulo: 'Moanna',
      fechaLanzamiento: new Date('2020-11-01'),
      precio: 300.99
    }]*/
  }
  /*
  pelicula ={
    titulo: 'Spider-Man xxx',
    fechaLanzamiento: new Date(),
    precio: 1400.99
  };
*/
/*
  peliculas =[{
    titulo: 'Spider-Man zz',
    fechaLanzamiento: new Date(),
    precio: 1400.99
  },
  {
    titulo: 'Moanna zzz',
    fechaLanzamiento: new Date('2020-11-01'),
    precio: 300.99
  }];
*/
borrar(peliculaId: number): void{
  this.pelicuasService.borrar(peliculaId).subscribe(() => this.borrado.emit());
}
}
