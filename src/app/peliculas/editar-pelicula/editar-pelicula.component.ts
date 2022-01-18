import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private peliculasService: PeliculasService,
    private activateRoute: ActivatedRoute, private router: Router) {}
 // modelo: PeliculaDTO = {titulo: 'Spiderman', 'trailer': 'abc', enCines: true, resumen: 'cosa', fechaLanzamiento: new Date(), poster: 'https://cronicaglobal.elespanol.com/uploads/s1/61/11/50/7/main-700b9bff30.jpeg'};
    modelo: PeliculaDTO;
    generosNoSeleccionados: MultipleSelectorModel[];
    generosSeleccionados: MultipleSelectorModel[];
    cinesSeleccionados: MultipleSelectorModel[];
    cinesNoSeleccionados: MultipleSelectorModel[];
    actoresSeleccionados: actorPeliculaDTO[];
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.peliculasService.putGet(params.id)
      .subscribe(peliculaPutGet => {
        this.modelo = peliculaPutGet.pelicula;

        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
        this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(cine => {
          return <MultipleSelectorModel>{llave: cine.id, valor: cine.nombre}
        });
        this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(cine => {
          return <MultipleSelectorModel>{llave: cine.id, valor: cine.nombre}
        });
        this.actoresSeleccionados = peliculaPutGet.actores;
      });
    });
  }
  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log(pelicula);
    this.peliculasService.editar(this.modelo.id, pelicula)
    .subscribe(() => this.router.navigate(['/pelicula/' + this.modelo.id]));
  }

}
