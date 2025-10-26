import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../types/product.type";
import {FormType} from "../types/form.type";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private products: ProductType[] = [];
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea')
  }

  searchProducts(data: string): Observable<ProductType[]> {
    let params = new HttpParams();
    params.set('search', data);
    return this.http.get<ProductType[]>('https://testologia.ru/tea', {
      params: params
    })

  }

  createOrder(data: FormType) {
    return this.http.post<{ success: boolean, message?: string}>(`https://testologia.ru/order-tea`, data)
  }
}
