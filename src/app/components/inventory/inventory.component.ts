import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products: Product[] = [];

  loaded: boolean = false;

  constructor( private marketService: MarketService) {
  }
  
  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts() {
    this.marketService.getProducts().subscribe( (data:Product[]) => {
      this.products = data;
      this.loaded = true;
    });
  }
}
