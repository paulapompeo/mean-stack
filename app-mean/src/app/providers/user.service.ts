import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/Users';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // url: string = 'http://127.0.0.1:8080/users';
  url: string = 'http://127.0.0.1:3000/users';
  // url: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(this.url)
      .pipe(map(data =>
        data.map((user) => new User(
          user.name,
          user.lastname,
          user.email,
          user.phone,
        ))
      )
    );
  }
}
