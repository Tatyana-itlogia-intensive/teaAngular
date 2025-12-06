import {Component, OnDestroy, OnInit} from '@angular/core';


import {Subscription} from "rxjs";

import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../../../shared/services/http.service";
import {ProductType} from "../../../../types/product.type";
import {SearchService} from "../../../shared/services/search.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: ProductType[] = [];
  public loading: boolean = false;
  private subscriptionSearch: Subscription | null = null;
  private subscription: Subscription | null = null;

  public nameCatalog: string  = "Наши чайные коллекции";

  constructor( private httpService: HttpService,
               private searchService: SearchService,
               private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params): void => {
      if (!params['search']) {
        this.loading = true;
        this.subscription = this.httpService.getProducts()
          .subscribe((products: ProductType[]): void => {
            console.log("обычный запрос");
            this.loading = false;
            this.products = products;
            this.products.forEach((product: ProductType): void => {
              if (product.description.length > 400) {
                product.description = product.description.substring(0, 395) + " ...";
              }
            })
          })
      }
    })

    this.subscriptionSearch = this.searchService.wordSearch$.subscribe(
     {
      next: (param: string): void => {
        if (!param) {
          this.loading = true;
          this.httpService.getProducts()
            .subscribe((products: ProductType[]): void => {
              console.log("поиск по пустой подписке");
              this.nameCatalog = "Наши чайные коллекции";

              this.loading = false;
              this.products = products;
              this.products.forEach((product: ProductType): void => {
                if (product.description.length > 400) {
                  product.description = product.description.substring(0, 395) + " ...";
                }
              })
            })
        } else {
          this.loading = true;
          this.httpService.searchProducts(param)
            .subscribe((products: ProductType[]): void => {
              console.log("поиск по заполненной подписке");
              console.log(param);
              this.nameCatalog = "Результаты поиска по запросу " + param;
              this.loading = false;
              this.products = products;
              this.products.filter((product: ProductType) => product.description.match(param));
              this.products.forEach((product: ProductType): void => {
                if (product.description.length > 400) {
                  product.description = product.description.substring(0, 395) + " ...";
                }
              })
            })
        }
      },
      error: (error: string) => {
        console.log("Ничего не найдено" + error);
      }
     })



    /*увеличение изображений карточек товаров*/
  //     $('.product-image').magnificPopup({
  //       type: 'image',
  //       closeOnContentClick: true,
  //     });
  //
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionSearch?.unsubscribe();
  }

}
