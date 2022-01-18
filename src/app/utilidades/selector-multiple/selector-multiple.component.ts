import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from './MultipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  constructor() { }

  @Input()
  Seleccionados: MultipleSelectorModel[] = [];

  @Input()
  noSeleccionados: MultipleSelectorModel[] = [];

  ngOnInit(): void {
  }

  seleccionar(item: MultipleSelectorModel, index: number){
    this.Seleccionados.push(item);
    this.noSeleccionados.splice(index, 1);
  }
  deseleccionar(item: MultipleSelectorModel, index: number){
    this.noSeleccionados.push(item);
    this.Seleccionados.splice(index, 1);
  }

  seleccionarTodo(){
    this.Seleccionados.push(...this.noSeleccionados);
    this.noSeleccionados = [];
  }
  deseleccionarTodo(){
    this.noSeleccionados.push(...this.Seleccionados);
    this.Seleccionados = [];
  }
}
