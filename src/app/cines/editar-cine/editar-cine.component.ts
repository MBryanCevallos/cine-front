import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor() { }
  modelo: cineDTO = {nombre: "Marlon Cevallos", latitud: -0.22984180797237974 , longitud: -78.52304220199586};
  ngOnInit(): void {
  }
  guardarCambios(cine: cineCreacionDTO){
    console.log(cine);

  }
}
