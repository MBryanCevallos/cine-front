import { HttpClient } from '@angular/common/http';
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
  public obtenerTodos(): Observable<generoDTO[]>{// retorna un observable por eso lo añadimos y debemos suscribirnos al observable
    return this.http.get<generoDTO[]>(this.apiUrl);
  }

  public crear(genero: generoCreacionDTO){
    return this.http.post(this.apiUrl, genero);
  }
}

