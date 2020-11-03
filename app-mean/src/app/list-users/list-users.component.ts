import { Component, OnInit } from '@angular/core';
import { User } from '../../models/Users';
import { UserService } from '../providers/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getAll();
  }

}
