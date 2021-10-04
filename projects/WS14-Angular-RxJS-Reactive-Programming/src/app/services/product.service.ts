import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private serverUrl: string = 'http://127.0.0.1:8080/products.json';

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.serverUrl)
      .pipe(
        map(productList => {
          return productList.map(product => ({
            ...product,
            price: product.price * 1.2
          }));
        })
      );
  }
}
