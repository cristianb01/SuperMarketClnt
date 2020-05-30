import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MarketService } from '../../services/market.service';
import { Product } from 'src/app/models/product';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  
  forma: FormGroup;

  loaded: boolean;
  constructor( private formBuilder: FormBuilder,
               private marketService: MarketService,
               private router: Router) {
    
    this.loaded = false;
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
        this.products.push(form);
      });//foreach
      this.loaded = true;
    });//subscribe
  }

  
  initForm() {
    this.forma = this.formBuilder.group({
      products: this.formBuilder.array([])
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


  deleteProduct(id: number, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.value) {

        this.marketService.deleteProduct(id).subscribe(resp => {
          this.products.removeAt(index);
        }, err => {
          //Do for error
        });
      }
    });
  }


  add(){
    this.router.navigate(['/createProduct']);
  }

  //Getters
  get products() {
    return this.forma.get('products') as FormArray;
  }
}
