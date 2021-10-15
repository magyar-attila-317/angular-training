import {Component} from '@angular/core';
import {ProductService} from './services/product.service';
import {CategoryService} from './services/category.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductModel} from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'WS14-Angular-RxJS-Reactive-Programming';

  private readonly NON_SELECTED_CATEGORY_VALUE = 0;
  public categoryChangeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.NON_SELECTED_CATEGORY_VALUE);
  public filteredProducts$: Observable<ProductModel[]>;

  constructor(public productService: ProductService,
              public categoryService: CategoryService) {

    this.filteredProducts$ = combineLatest(productService.allProductsWithCategories$, this.categoryChangeSubject)
      .pipe(
        map((data) => {
          let products = data[0];
          let categoryId = data[1];
          if (categoryId > 0) {
            return products.filter(p => p.categoryId === Number(categoryId));
          } else {
            return products;
          }
        })
      );

  }

  handleCategoryChange(event: any) {
    const newValue = event.currentTarget.value;
    console.log('new value:', newValue);

    this.categoryChangeSubject.next(newValue);
  }

}
