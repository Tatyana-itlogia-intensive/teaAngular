import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public wordSearch$: Subject<string> = new Subject<string>();
  public word = '';
}
