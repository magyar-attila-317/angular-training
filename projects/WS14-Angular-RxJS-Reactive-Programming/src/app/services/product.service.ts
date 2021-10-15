import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, zip} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {map} from 'rxjs/operators';
import {CategoryService} from './category.service';
import {CategoryModel} from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private serverUrl: string = 'http://127.0.0.1:8080/products.json';

  public allProducts$ = this.getProducts();
  public allProductsWithIncreasedPrice$ = this.getProductsWithIncreasedPrice();
  public allProductsWithCategories$ = this.getProductsWithCategories();

  constructor(private httpClient: HttpClient, private categoryService: CategoryService) {
  }

  private getProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.serverUrl)
      .pipe();
  }

  private getProductsWithIncreasedPrice(): Observable<ProductModel[]> {
    return this.getProducts()
      .pipe(
        map(this.increaseProductPrice)
      );
  }

  private increaseProductPrice(products: ProductModel[]) {
    return products.map(product => ({
      ...product,
      price: product.price * 1.2
    }));
  }

  private getProductsWithCategories(): Observable<ProductModel[]> {
    return zip(this.allProducts$, this.categoryService.categories$)
      .pipe(
        map((data) => {
          const products = data[0];
          const categories = data[1];
          return this.mapData(products, categories);
        })
      );
  }

  private mapData(products: ProductModel[], categories: CategoryModel[]) {
    const updatedProducts = products.map(product => {
      const categoryModel = categories.find(c => c.id === product.categoryId);
      product.categoryName = categoryModel.categoryName;
      return product;
    });
    return updatedProducts;
  }

}
