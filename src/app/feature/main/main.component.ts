import {Component, OnDestroy, OnInit} from '@angular/core';
import { AfterViewInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import { SlickCarouselComponent } from 'ngx-slick-carousel';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  public popup: boolean = false;

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  slides :{img: string; title: string; title2: string; text: string; class: string}[] = [
    { img: 'background-image: url( assets/images/1.png)',
      title: "Скидки на травянные чаи",
      title2: "",
      text: "Узнай все подробности, заполнив заявку",
      class: "banner1"
    },
    { img: 'background-image: url(assets/images/2.png)',
      title: "Закажи три пачки чая",
      title2: "и получи подарок",
      text: "",
      class: "banner2"
    },
    { img: 'background-image: url(assets/images/3.png)',
      title: "Попробуй нашу новинку",
      title2: "— ягодный чай",
      text: "",
      class: "banner3"
    }
  ];

  config: {slidesToShow: number; slidesToScroll: number; dots: boolean; infinite: boolean; speed: number;
    fade: boolean; cssEase: string; autoplay: boolean; autoplaySpeed: number} = {
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
  closePopup(): boolean {
    return this.popup = false;
  }

  ngOnInit(): void {
    this.subscription = this.subject
      .subscribe(
        (param:string): void => {
          console.log(param);
          this.popup = true;
        }
      )

  }
  ngAfterViewInit(): void {
    this.slickModal.slickGoTo(1);

}
ngOnDestroy(): void {
    this.subscription?.unsubscribe();
}

}
