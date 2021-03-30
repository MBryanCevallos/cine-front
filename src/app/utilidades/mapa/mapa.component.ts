import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { Coordenada } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  @Input()
  coordenadasIniciales: Coordenada[] = [];

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();
  
  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map(valor => marker([valor.latitud, valor.longitud]))
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 16,//
    center: latLng(-0.23102697706745093, -78.51974844932558)
  };

  capas: Marker<any>[] = []; 

  manejarClick(event: LeafletMouseEvent){
  const latitud = event.latlng.lat;
  const longitud = event.latlng.lng;
  console.log(latitud,longitud);

  this.capas= [];//para que solo se muestre una ubicacion selecionaada
  this.capas.push(marker([latitud, longitud]));
  this.coordenadaSeleccionada.emit({latitud: latitud, longitud: longitud});
  
  }
}
