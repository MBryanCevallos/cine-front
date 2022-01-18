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
    this.peliculasSerivce.obtenerLandingPage().subscribe(landingPage => {
      this.peliculasEnCine = landingPage.enCines;
      this.peliculasProximosEstrenos = landingPage.proximosEstrenos;
    });
   }
 peliculasEnCine: PeliculaDTO[];
 peliculasProximosEstrenos: PeliculaDTO[];
}
