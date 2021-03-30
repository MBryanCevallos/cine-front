import { AbstractControl, ValidatorFn } from '@angular/forms';

export function primeraLetraMayuscula(): ValidatorFn {
    return (control: AbstractControl) => {
        const valor = <string>control.value; // valor  es la letra
        if (!valor) return;
        if (valor.length === 0) return;

        const primeraLetra = valor[0]; // ubicacion de letra
        if (primeraLetra !== primeraLetra.toUpperCase()){ // validar si la priemra letra es mayus
            return{
                primeraLetraMayuscula: {
                mensaje: 'La primera letra debe ser mayúscula'
            }
        };
    }
      return;
    }
}