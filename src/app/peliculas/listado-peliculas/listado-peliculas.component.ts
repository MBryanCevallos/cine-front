import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor() { }
  @Input()
  pelis;
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
remover(indicePelicula: number): void{
  this.pelis.splice(indicePelicula, 1);
}
}
