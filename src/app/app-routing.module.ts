import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';


const routes: Routes = [
  { path: 'inventory', component: InventoryComponent },
  { path: 'createProduct', component: CreateProductComponent },
  { path: 'createCategory', component: CreateCategoryComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '**', pathMatch:'full', redirectTo:'inventory' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
