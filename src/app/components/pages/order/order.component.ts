import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../services/http.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  // создаем FormGroup для реактивной формы
  public formValues=  new FormGroup({
    product : new FormControl('', [Validators.required]),
    name : new FormControl('', [Validators.required, Validators.pattern('^[А-Яа-я]+')]),
    surname : new FormControl('', [Validators.required, Validators.pattern('^[А-Яа-я]+')]),
    phone : new FormControl('', [Validators.required, Validators.pattern('[+]?[0-9]{11}')]),
    country : new FormControl('', Validators.required),
    index : new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]),
    address : new FormControl('', [Validators.required, Validators.pattern('^[ А-Яа-я0-9/-]+')]),
    comment : new FormControl(''),
  })

  public btn = $('create-order');

  // создаем геттеры для упрощения кода в шаблоне
  get product() {
    return this.formValues.get('product');
  }
  get name() {
    return this.formValues.get('name');
  }
  get surname() {
    return this.formValues.get('surname');
  }
  get phone() {
    return this.formValues.get('phone');
  }
  get country() {
    return this.formValues.get('country');
  }
  get index() {
    return this.formValues.get('index');
  }
  get address() {
    return this.formValues.get('address');
  }


  constructor(private activateRoute: ActivatedRoute,
              private httpService: HttpService) {

  }
  // Создаем подписки чтобыпотом отписаться
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  public successForm: boolean = false;
  public errorForm: boolean = false;

  /*валидация формы*/
  createOrder() {

    this.successForm = false;
    this.errorForm = false;
    if (!this.formValues.get('name')!.value) {
      alert('Заполните, пожалуйста, поле Имя');
      return;
    }
    if (!this.formValues.get('surname')!.value) {
      alert('Заполните, пожалуйста, поле Фамилия');
      return;
    }
    if (!this.formValues.get('phone')!.value) {
      alert('Заполните, пожалуйста, поле Телефон');
      return;
    }
    if (!this.formValues.get('country')!.value) {
      alert('Заполните, пожалуйста, поле Страна');
      return;
    }
    if (!this.formValues.get('index')!.value) {
      alert('Заполните, пожалуйста, поле Индекс');
      return;
    }
    if (!this.formValues.get('address')!.value) {
      alert('Заполните, пожалуйста, поле Адрес');
      return;
    }

    this.btn.addClass('disabled');

    this.subscriptionOrder = this.httpService.createOrder({
      product : this.formValues.get('product')!.value,
      name :  this.formValues.get('name')!.value,
      last_name : this.formValues.get('surname')!.value,
      phone :  this.formValues.get('phone')!.value,
      country : this.formValues.get('country')!.value,
      zip :  this.formValues.get('index')!.value,
      address :  this.formValues.get('address')!.value,
      comment :  this.formValues.get('comment')!.value,
    }).subscribe(
      {
        next: (response) => {
          if (response.success && !response.message) {

            this.btn.removeClass('disabled');
            this.formValues.patchValue({
              name :  '',
              surname : '',
              phone :  '',
              country : '',
              index :  '',
              address :  '',
              comment :  '',
            });
            this.successForm = true;
          }
        },
        error: (error) => {
          this.errorForm = true;
          setTimeout(() => {
            this.errorForm = false;
          }, 3000)
          console.log(error);
        }
      }
    );

  }

  ngOnInit(): void {
    // присвоить значение в поле Продукт
    this.subscription = this.activateRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.patchValue({
          product: params['product']
        });
      }
    })

    // Сделать поле Продукт неактивным (неизменяемым)
    this.formValues.get('product')?.disable();

  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }
}
