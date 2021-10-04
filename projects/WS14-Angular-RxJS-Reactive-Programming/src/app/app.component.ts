import {Component, OnInit} from '@angular/core';
import {ProductService} from './services/product.service';
import {CategoryModel} from './models/category.model';
import {CategoryService} from './services/category.service';
import {ProductModel} from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'WS14-Angular-RxJS-Reactive-Programming';

  products: ProductModel[] = [];
  categories: CategoryModel[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService) {
  }

  public ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }


}
