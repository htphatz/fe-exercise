import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-detail-list',
  templateUrl: './user-detail-list.component.html',
  styleUrls: ['./user-detail-list.component.css'],
})
export class UserDetailListComponent {
  @Input() users: User[] = [];
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 0;

  @Output() deleteEvent = new EventEmitter();
  @Output() nextPageEvent = new EventEmitter();

  sendEventDelete(id: string): void {
    this.deleteEvent.emit(id);
  }

  nextPage(event: PageEvent): void {
    const request: { page: string; size: string } = { page: '', size: '' };
    request.page = event.pageIndex.toString();
    request.size = event.pageSize.toString();
    this.nextPageEvent.emit(request);
  }
}
