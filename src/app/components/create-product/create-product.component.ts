import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Category } from '../../models/category';
import { ProductPostResource } from '../../models/resources/productPost-resource';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  forma: FormGroup;
  categories: Category[] = [];

  constructor( private marketService: MarketService,
               public formBuilder: FormBuilder 
               ) 
               { 
                 this.initForm();
                 this.loadDataForm();
               }

  ngOnInit(): void {
  }


  initForm() {
    this.forma = this.formBuilder.group({
      name :     ['', [Validators.required, Validators.minLength(3)]],
      quantity : ['', [Validators.required]],
      category : ['', Validators.required]
    });
  }

  loadDataForm() {
    this.marketService.getCategories().subscribe( (resp:Category[]) => {
     this.categories = resp;
    });
  }

  submit() {

    if(this.forma.invalid) {
      return Object.values(this.forma.controls).forEach( control => control.markAsTouched() );
    }
    this.postProduct();
    this.forma.reset();
  }

  postProduct() {
    let productResource: ProductPostResource = {
      name: this.forma.get('name').value,
      quantityInPackage: this.forma.get('quantity').value,
      categoryId: Number (this.forma.get('category').value)
    }


    this.marketService.postProduct(productResource).subscribe( resp => {
      Swal.fire({
        allowOutsideClick: true,
        icon: 'success',
        text: `Created category ${resp['name']} with id: ${resp['id']}`
      });
    },
      err => {
        console.log(err);
        let error = err.error;
          Swal.fire({
            allowOutsideClick: true,
            icon: 'error',
            text: error
          });
      }
    )
  }



  //Getters
  get nameInvalid()  {
    let control = this.forma.get('name');
    return control.invalid && control.touched;
  }

  get quantityInvalid()  {
    let control = this.forma.get('quantity');
    return control.invalid && control.touched;
  }

  get categoryInvalid()  {
    let control = this.forma.get('category');
    return control.invalid && control.touched;
  }

}
