import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  @Input() users: User[] = [];

  @Output() deleteEvent = new EventEmitter();

  sendEventDelete(id: string): void {
    this.deleteEvent.emit(id);
  }
}
