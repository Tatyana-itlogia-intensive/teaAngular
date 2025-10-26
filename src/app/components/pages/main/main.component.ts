import {Component, OnDestroy, OnInit} from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {Subject, Subscription} from "rxjs";
import { SlickCarouselComponent } from 'ngx-slick-carousel';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  public popup = false;

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  slides = [
    { img: "../src/assets/images/1.png",
      title: "Скидки на травянные чаи",
      text: "Узнай все подробности, заполнив заявку",
      class: "banner1"
    },
    { img: "../src/assets/images/2.png",
      title: "Закажи три пачки чая и получи подарок",
      text: "",
      class: "banner2"
    },
    { img: "../src/assets/images/3.png",
      title: "Попробуй нашу новинку — ягодный чай",
      text: "",
      class: "banner3"
    }
  ];

  config = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 1500
  };

  private subject: Subject<string>;
  private subscription: Subscription | null = null;

  constructor() {
    this.subject = new Subject<string>();
    setTimeout(() => {
      this.subject.next('HELLO')
    }, 10000)

  }
  closePopup() {
    return this.popup = false;
  }

  ngOnInit(): void {
    this.subscription = this.subject
      .subscribe(
        (param:string) => {
          console.log(param);
          this.popup = true;
        }
      )

  }
  ngAfterViewInit() {
    this.slickModal.slickGoTo(1);

}
ngOnDestroy() {
    this.subscription?.unsubscribe();
}

}
