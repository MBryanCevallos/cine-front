import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../pelicula';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, // 1 crear formBulder
    private location: Location, // 16 crear servicio url
    private activatedRoute: ActivatedRoute,
    private generosService: GenerosService,
    private peliculasServices: PeliculasService) { }  // 18// leer valores de URL  y que cuando se copie y pegue el link tome los filtros

  form: FormGroup; // 2 crear formgroup
 /* generos = [{id: 1, nombre: 'Drama'}, // 7 cargar combo
           {id: 2, nombre: 'Acción'},
           {id: 3, nombre: 'Comedia'}]; */
  generos: generoDTO[] = [];
  paginaActual = 1;
  cantidadElementosAMostrar = 10;
  cantidadElementos;
  /* peliculas = [{titulo: 'Spiderman', enCines: false, proximosEstrenos: true, generos: [1,2], poster: 'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_UX182_CR0,0,182,268_AL_.jpg'},
              {titulo: 'Moana', enCines: true, proximosEstrenos: false, generos: [3], poster: 'https://m.media-amazon.com/images/M/MV5BNWFkN2E3ZDYtYmVlMy00N2YyLWI1NzQtOTRlZmYyYmQ1MzRjXkEyXkFqcGdeQXVyMjI2NzcyNDk@._V1_UY268_CR43,0,182,268_AL_.jpg'},
              {titulo: 'Cantinflas', enCines: false, proximosEstrenos: false, generos: [1,3], poster: 'https://m.media-amazon.com/images/M/MV5BN2Q5OWUzNGQtNTA1Mi00ZmE1LThhNzItOWI5YzMwNjMyOTBiXkEyXkFqcGdeQXVyMTE2NzA0Ng@@._V1_UX182_CR0,0,182,268_AL_.jpg'
          }] // 11 cargar datos de la pelicula
    peliculasOriginal = this.peliculas // 13hacer el filtro
          */
  peliculas: PeliculaDTO[];


formularioOriginal = {
  titulo: '',
  generoId: 0,
  proximosEstrenos: false,
  enCines: false
};

  ngOnInit(): void {   // 4 definir y escribir los parámetros

    this.generosService.obtenerTodos()
    .subscribe(generos => {this.generos = generos;

      this.form = this.formBuilder.group(this.formularioOriginal); // se lo hizo para aplicar el limpiar filtros
      this.leerValoreURL(); // 20 llamar a la funcion - aqui aplica los filtros en el texbox sleect y check
      this.buscarPeliculas(this.form.value); // 21 nuevos valores del formulario - aqui aplica los filtros a las imagenes
      /*  {
        titulo:'',
        generoId: 0,
        proximosEstrenos: false,
        enCines: false
      });*/
      this.form.valueChanges.subscribe(valores => {
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL(); // 18 llamamos al metodo
      });
    });

  }

  private leerValoreURL(){ // 19 funcion para leer parametros de la url
    this.activatedRoute.queryParams.subscribe((params) => {
      var objeto: any = {};
      if (params.titulo){
        objeto.titulo = params.titulo;
      }
      if (params.generoId){
        objeto.generoId = Number(params.generoId);
      }
      if (params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }
      if (params.enCines){
        objeto.enCines = params.enCines;
      }
      this.form.patchValue(objeto);
    });
  }

  private escribirParametrosBusquedaEnURL(){ // 15 Query string - mientras se va filtrando la yrl toma los filtros
    var queryStrings = [];
    var valoresFormulario = this.form.value;
    if (valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`); // ${} es string interpolation
    }
    if (valoresFormulario.generoId != '0'){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`); // ${} es string interpolation
    }
    if (valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`); // ${} es string interpolation
    }
    if (valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`); // ${} es string interpolation
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&')); // 17 usar servicio location
  }

  buscarPeliculas(valores: any){  // 13 buscar pleicula por text , sleccion o filtro
     valores.pagina = this.paginaActual;
     valores.recordsPorPagina = this.cantidadElementosAMostrar;
     this.peliculasServices.filtrar(valores).subscribe(response => {
     this.peliculas = response.body;
     this.escribirParametrosBusquedaEnURL();
     this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
   });
    /*if (valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }
    if (valores.generoId){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }
    if (valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }
    if (valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }*/
  }
  limpiar(){ // 14 limpiar filtros
    this.form.patchValue(this.formularioOriginal); // así pasamos el formulario original antes de que carge datos es decir cuando está vacio
  }

  paginatorUpdate(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }

}
