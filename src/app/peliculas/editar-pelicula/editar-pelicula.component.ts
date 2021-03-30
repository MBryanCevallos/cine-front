import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor() { }

    modelo: PeliculaDTO = {titulo: 'Spiderman', 'trailer': 'abc', enCines: true, resumen: 'cosa', fechaLanzamiento: new Date(), poster: 'https://cronicaglobal.elespanol.com/uploads/s1/61/11/50/7/main-700b9bff30.jpeg'};
  ngOnInit(): void {
  } 
  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log(pelicula);
  }

}
