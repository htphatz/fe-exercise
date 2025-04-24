import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  users: User[] = [
    {
      id: '1',
      username: 'john_doe',
      password: 'password123',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      id: '2',
      username: 'jane_smith',
      password: 'secure456',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
    },
    {
      id: '3',
      username: 'alice_jones',
      password: 'alice789',
      email: 'alice.jones@example.com',
      firstName: 'Alice',
      lastName: 'Jones',
    },
    {
      id: '4',
      username: 'bob_wilson',
      password: 'bobpass101',
      email: 'bob.wilson@example.com',
      firstName: 'Bob',
      lastName: 'Wilson',
    },
    {
      id: '5',
      username: 'emma_brown',
      password: 'emma2023',
      email: 'emma.brown@example.com',
      firstName: 'Emma',
      lastName: 'Brown',
    },
    {
      id: '6',
      username: 'david_clark',
      password: 'david456',
      email: 'david.clark@example.com',
      firstName: 'David',
      lastName: 'Clark',
    },
    {
      id: '7',
      username: 'sarah_lewis',
      password: 'sarah789',
      email: 'sarah.lewis@example.com',
      firstName: 'Sarah',
      lastName: 'Lewis',
    },
    {
      id: '8',
      username: 'michael_hall',
      password: 'michael101',
      email: 'michael.hall@example.com',
      firstName: 'Michael',
      lastName: 'Hall',
    },
    {
      id: '9',
      username: 'linda_martin',
      password: 'linda2023',
      email: 'linda.martin@example.com',
      firstName: 'Linda',
      lastName: 'Martin',
    },
    {
      id: '10',
      username: 'james_taylor',
      password: 'jamespass',
      email: 'james.taylor@example.com',
      firstName: 'James',
      lastName: 'Taylor',
    },
  ];

  ngOnInit(): void {
    console.log('OnInit');
  }

  ngOnDestroy(): void {
    console.log('OnDestroy');
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
