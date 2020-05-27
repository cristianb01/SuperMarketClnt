import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  validName(control: FormControl):{[s:string]: boolean} {
    const value = control.value;
    const character = value.charAt(0);
    
    if (character == character.toUpperCase()) {
      return null;
    }
    if (character == character.toLowerCase()){
      return {
        validName: false
      };
    }
  }
}
