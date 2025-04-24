import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  @Input()
  user: User = {};

  @Output()
  deleteEvent = new EventEmitter();

  sendEventDelete(): void {
    this.deleteEvent.emit(this.user.id);
  }
}
