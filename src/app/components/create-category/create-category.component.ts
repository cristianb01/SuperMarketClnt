import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarketService } from '../../services/market.service';
import { CategoryPostResource } from '../../models/resources/categoryPost-resource';

import Swal from 'sweetalert2';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  forma: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private marketService: MarketService,
               private validatorsService: ValidatorsService) { 

    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(){
    this.forma = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), this.validatorsService.validName]]
    });
  }


  
  submit(){
    const category: CategoryPostResource = {
      name: this.forma.get('name').value
    }
    
    this.marketService.postCategory(category).subscribe( resp => {
      Swal.fire({
        allowOutsideClick: true,
        icon: 'success',
        text: `Created category ${resp['name']}\n with id:${resp['id']}`
      });
    }, e => {
      console.log(e);
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: e.error
      });
    });
  }
  
  //Getters
  get nameInvalid() {
    return this.forma.get('name').invalid && this.forma.get('name').touched;
  }
}
