import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  constructor() { }

    imagenBase64: string;

    @Input()
    urlImagenActual: string;
    @Output()
    archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();

  ngOnInit(): void {
  }
  change(event){
    if(event.target.files.length > 0){ //saber cuantos archivos fueron seleccionados
      const file: File = event.target.files[0];
      toBase64(file).then((value: string)=> this.imagenBase64 = value)
      .catch(error =>  console.log(error));
      this,this.archivoSeleccionado.emit(file);
      this.urlImagenActual= null; // para que no muestra la imagen anterio en caso de eligir una nueva
    }
  }

}
