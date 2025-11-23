import {Component, OnDestroy, OnInit} from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {config, Subject, Subscription} from "rxjs";
import { SlickCarouselComponent } from 'ngx-slick-carousel';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  public popup = false;

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  slides = [
    { img: 'background-image: url( ../../../../assets/images/1.png)',
      title: "Скидки на травянные чаи",
      title2: "",
      text: "Узнай все подробности, заполнив заявку",
      class: "banner1"
    },
    { img: 'background-image: url(../../../../assets/images/2.png)',
      title: "Закажи три пачки чая",
      title2: "и получи подарок",
      text: "",
      class: "banner2"
    },
    { img: 'background-image: url(../../../../assets/images/3.png)',
      title: "Попробуй нашу новинку",
      title2: "— ягодный чай",
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
    setTimeout((): void => {
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
