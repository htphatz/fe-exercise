import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  user: User = { id: '', username: '', email: '', firstName: '', lastName: '' };
  id: string = '';

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.userService.getById(this.id).subscribe((response) => {
      if (response.result) {
        this.user = response.result;
      }
    });
  }
}
