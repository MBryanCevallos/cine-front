import { Component, OnInit } from '@angular/core';
import { PeliculaDTO } from '../peliculas/pelicula';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styles: [
  ]
})
export class LandingPageComponent implements OnInit {

  constructor(private peliculasSerivce: PeliculasService){}
  ngOnInit(): void {
    this.cargarDatos();
   }
 peliculasEnCine: PeliculaDTO[];
 peliculasProximosEstrenos: PeliculaDTO[];

 cargarDatos(){
  this.peliculasSerivce.obtenerLandingPage().subscribe(landingPage => {
    this.peliculasEnCine = landingPage.enCines;
    this.peliculasProximosEstrenos = landingPage.proximosEstrenos;
  });
 }

 borrado(){
   this.cargarDatos();
}
}
