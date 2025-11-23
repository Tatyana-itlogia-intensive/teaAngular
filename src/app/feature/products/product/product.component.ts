import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {ProductType} from "../../../../types/product.type";
import {HttpService} from "../../../shared/services/http.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductType;


  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private router: Router) {
    this.product = {
      id: 0,
      image: "",
      title: "",
      price: 0,
      description: ""
    }


  }

  buy() {
    this.router.navigate(['/order'], { queryParams: { product: this.product.title } });

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.httpService.getProducts()
          .pipe(
            map((products: ProductType[]) => {
              products.find((product: ProductType) => {
                if (product.id == params['id'].slice(1, 2)) {
                  this.product = {
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    price: product.price,
                    description: product.description
                  }
                };

              })
            })
          )
          .subscribe(
          {
            next: (product) => {

            },
            error: (error) => {
              console.error(error);
              this.router.navigate(['/']);
            }
          })
      }

    })
  }

}
