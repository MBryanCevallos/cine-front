import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from '../seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.css']
})
export class FormularioAutenticacionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
  } // 1 usamos formBulider
  form: FormGroup; // 2creamos un formulario grupo
  @Input() // 4 creamos los imput y output
  errores: string[] = [];
  @Input()
  accion: string; // texto del botón en el html
  @Output()
  onSubmit: EventEmitter<credencialesUsuario> = new EventEmitter<credencialesUsuario>();

  ngOnInit(): void {// 3 aplicamos validaciones de email
    this.form = this.formBuilder.group({
      email: ['', {validators: [Validators.required, Validators.email]}],
       password: ['', {validators: [Validators.required]}]
    });
  }



  obtenerMensajeErrorEmail(){ // 7  validadciones que se manda a llamar desde el html
    var campo = this.form.get('email');
    if (campo.hasError('required'))
    {
      return 'El campo Email es requerido';
    }
    if (campo.hasError('email')){
      return 'El mail no es válido';
    }
    return '';
  }
  }
