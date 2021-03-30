import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor() { }
 
  control: FormControl = new FormControl; //formCotrol nos permite manejar un campo de un formulario de manera individual

  actores = [ //ng for
  {nombre: 'Tom Holland', personaje: '', foto: 'https://culturageek.com.ar/wp-content/uploads/2021/02/tomholland-scaled.jpg' },
  {nombre: 'Tom Hanks', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Tom_Hanks_TIFF_2019.jpg' },
  {nombre: 'Samuel Jackson', personaje: '', foto: 'http://es.web.img2.acsta.net/pictures/15/07/27/12/24/354255.jpg' }
  ];

  actoresOtiginal = this.actores;

  actoresSeleccionados =[];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];
  @ViewChild(MatTable) table: MatTable<any> //actualiza la tabla  de los datos del actos

  ngOnInit(): void {  // autocomplete
    this.control.valueChanges.subscribe(valor => {
      this.actores = this.actoresOtiginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !== -1);
    });
  }
  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if(this.table !== undefined){ // mostras datso de tabla
      this.table.renderRows();
    }
  }

 /* para validar que solo selecciones un actor
 optionSelected(event: MatAutocompleteSelectedEvent){
   const index = this.actoresSeleccionados.findIndex(x => x.id === event.option.value.id);
  if(index === -1){
    this.actoresSeleccionados.push(event.option.value);
      if(this.table !== undefined){ // mostras datso de tabla
      this.table.renderRows();
  }
}
this.control.patchValue('');
} */


  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre == actor.nombre);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor === event.item.data)
      moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex); // cambia el index del array
      this.table.renderRows();
  }
}