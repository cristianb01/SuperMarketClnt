import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { ProductPostResource } from '../models/resources/productPost-resource';
import { CategoryPostResource } from '../models/resources/categoryPost-resource';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  readonly url: string = "http://localhost:51071/api";

  constructor( private httpClient: HttpClient ) {}

  //Products requests
  getProducts() {
    const URI = this.url + '/products';
    return this.httpClient.get(URI).pipe(
      map( resp =>  this.loadArray(resp)));
  }

  getSingleProduct(id: number) {
    const URI = this.url + `/products/${id}`;
    return this.httpClient.get(URI).pipe(
      map( (resp: Product) => {
        const product: Product = resp;
        return product;
      })
    );
  }

  postProduct( product: ProductPostResource) {
    const URI = this.url + '/products';
    return this.httpClient.post(URI, product);
  }


  //Categories requests
  getCategories() {
    const URI = this.url + '/categories';
    return this.httpClient.get(URI).pipe(
      map( (resp: Category[]) =>  resp));
  }

  postCategory( category: CategoryPostResource) {
    const URI = this.url + '/categories';
    return this.httpClient.post(URI, category);
  }

  private loadArray(productObj: object){
    const products: Product[] = [];

    Object.keys(productObj).forEach(key => {
      const product: Product = productObj[key];
      products.push(product);
    });

    return products;
  }

}
