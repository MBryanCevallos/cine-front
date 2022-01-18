import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatFormFieldModule} from '@angular/material/form-field'; // para interfaz de formulario mat-form-field
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker'; // calendario
import {MatNativeDateModule} from '@angular/material/core'; // importar para usar el calendario picker
import {MatTabsModule} from '@angular/material/tabs'; // para uso de de markdown
import {MatAutocompleteModule} from '@angular/material/autocomplete'; // autocomplete
import {MatTableModule} from '@angular/material/table';  // tabla
import {DragDropModule} from '@angular/cdk/drag-drop'; // arrastrar autor
import {MatPaginatorModule} from '@angular/material/paginator'; // paginacion
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatTableModule,
    DragDropModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
