import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryModel} from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private serverUrl: string = 'http://127.0.0.1:8080/categories.json';

  public categories$ = this.getCategories();

  constructor(private httpClient: HttpClient) {
  }

  private getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.serverUrl);
  }

}
