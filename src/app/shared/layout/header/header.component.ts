import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {SearchService} from "../../services/search.service";



@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productSearch: FormControl = new FormControl();

  constructor(private searchService: SearchService,
              private router: Router) { }

  search(): void {
    if (this.productSearch) {
      if (this.productSearch.value) {
        console.log("В поиске что-то есть");
        this.searchService.word = this.productSearch.value;
      } else {
        console.log("В поиске ничего нет");
        this.searchService.word = "";
      }
      console.log("поиск по кнопке поиска")
      this.searchService.wordSearch$.next(this.searchService.word);
      this.router.navigate(['/products']
        , { queryParams: { search: this.productSearch.value }}
      );
    }

  }

  ngOnInit(): void {
  }

}
