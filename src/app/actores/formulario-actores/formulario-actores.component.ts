import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  form: FormGroup;
  @Input()
  modelo: actorDTO;

  @Input()
  errores: string[] = [];

  @Output()
  Onsubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  imagenCambiada = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',
        {
          validators: [Validators.required]
        },
      ],
      fechaNacimiento: '',
      foto: '',
      biografia: ''
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }
  archivoSeleccionado(file) {
    this.imagenCambiada = true;
    this.form.get('foto').setValue(file);
  }
  cambioMarkdown(texto: string) {
    this.form.get('biografia').setValue(texto);

  }

  onsubmit() {
    if (!this.imagenCambiada){
      this.form.patchValue({'foto': null}); // de esta manera no enviamos foto si el usuario no edita la foto
    }
    this.Onsubmit.emit(this.form.value);
  }
}
