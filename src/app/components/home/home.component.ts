import { Component, OnDestroy, OnInit } from '@angular/core';
import { Search } from 'src/app/models/search.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  users: User[] = [];
  id: string = '';
  totalItems: number = 0;
  pageSize: number = 5;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      if (response.result) {
        this.users = response.result.items;
        this.totalItems = response.result.totalItems;
        this.pageSize = response.result.size;
      }
    });
  }

  deleteUser(id: string) {
    console.log('deleteUser: ', id);
    this.userService.deleteById(id);
    this.loadUsers();
  }

  searchUsers(searchData: Search) {
    this.userService
      .searchUsers(
        searchData.pageNumber,
        searchData.pageSize,
        searchData.username,
        searchData.firstName,
        searchData.lastName,
        searchData.email
      )
      .subscribe((response) => {
        if (response.result) {
          this.users = response.result.items;
        }
      });
  }

  nextPage(request: { page: string; size: string }) {
    this.userService
      .searchUsers(parseInt(request.page + 1), parseInt(request.size))
      .subscribe((response) => {
        if (response.result) {
          this.users = response.result.items;
          this.totalItems = response.result.totalItems;
          this.pageSize = response.result.size;
        }
      });
  }
}
