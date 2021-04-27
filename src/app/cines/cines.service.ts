import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoDTO } from '../generos/genero';
import { cineCreacionDTO, cineDTO } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {
  constructor(private http: HttpClient) { } // en ngmodule importarmos httpclient

  private apiUrl = environment.apiUrl + 'cines'; // lllamamos la url de ambiente de desarrollo

  public crear(cine: cineCreacionDTO){
    return this.http.post(this.apiUrl, cine);
  }
  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number):
  Observable<any>{// retorna un observable por eso lo  añadimos y debemos suscribirnos al observable
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString()); // recordsPorPagina lo trae del back end
    return this.http.get<cineDTO[]>(this.apiUrl, {observe: 'response', params}); // obtener la informacion de la cabecera observe
  }
  public obtenerPorId(id: number): Observable<cineDTO>{
    return this.http.get<cineDTO>(`${this.apiUrl}/${id}`);
  }
  public editar(id: number, cine: cineCreacionDTO){
    return this.http.put(`${this.apiUrl}/${id}`, cine);
  }
  public borrar(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
