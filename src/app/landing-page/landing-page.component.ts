import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styles: [
  ]
})
export class LandingPageComponent implements OnInit {

  ngOnInit(): void {
       this.pelisEnCine =[
         {
       titulo: 'Spider-Man',
       fechaLanzamiento: new Date(),
       precio: 1400.99,
       poster: 'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_UX182_CR0,0,182,268_AL_.jpg'
     },
     {
       titulo: 'Moanna',
       fechaLanzamiento: new Date('2020-11-01'),
       precio: 300.99,
       poster: 'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_UX182_CR0,0,182,268_AL_.jpg'
     }]
   }
 pelisEnCine;
 pelisProximosEstrenos =[];
}
