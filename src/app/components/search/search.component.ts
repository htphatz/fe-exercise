import { Component, EventEmitter, Output } from '@angular/core';
import { Search } from 'src/app/models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<Search>();

  searchData: Search = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  sendSearchEvent(): void {
    this.searchEvent.emit(this.searchData);
  }
}
