import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { ActivatedRoute } from "@angular/router";
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  loaded: boolean;

  constructor( private marketService: MarketService,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loaded = false;
    this.loadProduct();
  }

    
  loadProduct() {
    this.activatedRoute.params.subscribe( params => {
      const id: number = Number (params['id']);
      this.marketService.getSingleProduct(id).subscribe( resp => {
        this.product = resp;
        console.log(resp);
        this.loaded = true;
      });

    })
  }
}
