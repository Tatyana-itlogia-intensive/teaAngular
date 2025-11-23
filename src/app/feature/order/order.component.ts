import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../../shared/services/http.service";




@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  // создаем FormBuilder для реактивной формы
    orderForm=  this.fb.group({
    product : ['', [Validators.required]],
    name : ['', [Validators.required, Validators.pattern('^[А-Яа-я]+')]],
    surname : ['', [Validators.required, Validators.pattern('^[А-Яа-я]+')]],
    phone : ['', [Validators.required, Validators.pattern('[+]?[0-9]{11}')]],
    country : ['', Validators.required],
    index : ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
    address : ['', [Validators.required, Validators.pattern('^[ А-Яа-я0-9/-]+')]],
    comment : [''],
  })

  // создаем геттеры для упрощения кода в шаблоне
  get product() {
    return this.orderForm.get('product');
  }
  get name() {
    return this.orderForm.get('name');
  }
  get surname() {
    return this.orderForm.get('surname');
  }
  get phone() {
    return this.orderForm.get('phone');
  }
  get country() {
    return this.orderForm.get('country');
  }
  get index() {
    return this.orderForm.get('index');
  }
  get address() {
    return this.orderForm.get('address');
  }
  get comment() {
    return this.orderForm.get('comment');
  }


  constructor(private activateRoute: ActivatedRoute,
              private httpService: HttpService,
              private fb: FormBuilder) {

  }
  // Создаем подписки чтобыпотом отписаться
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  public successForm: boolean = false;
  public errorForm: boolean = false;

  /*валидация формы*/
  createOrder(): void {

    this.successForm = false;
    this.errorForm = false;

    if (this.product && this.name && this.surname && this.phone && this.country && this.address && this.index && this.comment) {
      this.subscriptionOrder = this.httpService.createOrder({
        product : this.product.value,
        name :  this.name.value,
        last_name : this.surname.value,
        phone :  this.phone.value,
        country : this.country.value,
        zip :  this.index.value,
        address :  this.address.value,
        comment :  this.comment.value,
      }).subscribe(
        {
          next: (response: {success: boolean; message?: string}): void => {
            if (response.success && !response.message) {
              this.orderForm.reset();
              this.successForm = true;
            }
          },
          error: (error: {error: string}): void => {
            this.errorForm = true;
            setTimeout((): void => {
              this.errorForm = false;
            }, 3000)
            console.log(error);
          }
        }
      );
    }

  }

  ngOnInit(): void {
    // присвоить значение в поле Продукт
    this.subscription = this.activateRoute.queryParams.subscribe((params: Params): void => {
      if (params['product']) {
        this.orderForm.patchValue({
          product: params['product']
        });
      }
    })

    // Сделать поле Продукт неактивным (неизменяемым)
    this.orderForm.get('product')?.disable();

  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

}
