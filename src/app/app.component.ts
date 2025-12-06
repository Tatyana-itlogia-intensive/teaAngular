import {Component, OnInit} from '@angular/core';
import {NgwWowService} from "ngx-wow";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'teaAngular';


  constructor(private WOW: NgwWowService) {
  }
  ngOnInit(): void {
    this.WOW.init({
      animateClass: 'animate__animated',
    });
  }

}
