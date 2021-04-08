import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-formularios-genero',
  templateUrl: './formularios-genero.component.html',
  styleUrls: ['./formularios-genero.component.css']
})
export class FormulariosGeneroComponent implements OnInit {

  constructor(private formbuilder: FormBuilder) { }

  form: FormGroup; // es un conjunto de campos de un formlarios junto a sus configuraciones
  @Input()
  errores: string[] = [];

  @Input()
  modelo: generoCreacionDTO;

  @Output()
  onSubmit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>(); 

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      nombre: ['', {  // para validar crearmos un arreglo donde el primer campo es el por defecto es decir vacio y luego el requerido
        validators: [Validators.required, Validators.minLength(3), primeraLetraMayuscula()]  // validaciones
      }]
    });

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo); // va a hacer match las propiedades del modelo con las propiedades del formulario
    }
  }
  guardarCambios(){
    this.onSubmit.emit(this.form.value);  // con este value accedo al contenido del formulario
  }
  obtenerErrorCampoNombre(){
    var campo = this.form.get('nombre');
    if (campo.hasError('required')){
      return 'El campo es requerido';
    }
    if (campo.hasError('minlength')){
      return 'La longitud mínima es de 3 caracteres';
    }
    if (campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;  // estrae el mensaje de error desde la utiliadad creada.
    }
    return '';
  }

}
