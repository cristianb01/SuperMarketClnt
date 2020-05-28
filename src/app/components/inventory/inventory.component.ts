import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MarketService } from '../../services/market.service';
import { Product } from 'src/app/models/product';
import { Category } from '../../models/category';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  
  forma: FormGroup;
  constructor( private formBuilder: FormBuilder,
               private marketService: MarketService ) {
    this.initForm();
    this.loadDataForm();
   }

  ngOnInit(): void {
  }

  loadDataForm() {
    this.marketService.getProducts().subscribe( (resp:Product[]) => {
      resp.forEach( product => {
        let form = this.productFormGroup();
        form.reset({
          id: product.id,
          name: product.name,
          quantity: product.quantityInPackage,
          category: product.category.name
        });
        console.log(form);
        this.products.push(form);
      });//foreach
    });//subscribe
  }

  
  initForm() {
    this.forma = this.formBuilder.group({
      products: this.formBuilder.array([this.productFormGroup()])
    });
  }
  
  productFormGroup(): FormGroup {
    return this.formBuilder.group({
      id:       [''],
      name:     [''],
      quantity: [''],
      category: ['']
    });
  }


  //Getters
  get products() {
    return this.forma.get('products') as FormArray;
  }
}
