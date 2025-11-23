import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import * as $ from 'jquery';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgwWowModule} from "ngx-wow";
import {MainModule} from "./feature/main/main.module";
import {OrderModule} from "./feature/order/order.module";
import {ProductsModule} from "./feature/products/products.module";
import {SharedModule} from "./shared/shared.module";
import {HeaderComponent} from "./shared/layout/header/header.component";
import {FooterComponent} from "./shared/layout/footer/footer.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    OrderModule,
    ProductsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule,
    NgbAccordionModule,
    NgbModule,
    NgwWowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
