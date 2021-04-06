import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoCreacionDTO, generoDTO } from './genero';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(private http: HttpClient) { } // en ngmodule importarmos httpclient

  private apiUrl = environment.apiUrl + 'generos'; // lllamamos la url de ambiente de desarrollo
  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number):
  Observable<any>{// retorna un observable por eso lo  añadimos y debemos suscribirnos al observable
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString()); // recordsPorPagina lo trae del back end
    return this.http.get<generoDTO[]>(this.apiUrl, {observe: 'response', params}); // obtener la informacion de la cabecera observe
  }

  public crear(genero: generoCreacionDTO){
    return this.http.post(this.apiUrl, genero);
  }
}

