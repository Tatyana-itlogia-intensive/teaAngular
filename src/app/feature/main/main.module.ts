import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./main.component";
import {RouterModule} from "@angular/router";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {NgbAccordionModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgwWowModule} from "ngx-wow";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule,
    SlickCarouselModule,
    NgbAccordionModule,
    NgbModule,
    NgwWowModule
  ],
  exports: [
    MainRoutingModule
  ]
})
export class MainModule { }
