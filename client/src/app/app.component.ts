import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(
    private http: HttpClient,
    public userService : UserService,

  ) {}
  ngOnInit(): void {
    this.setCurrentUser();
  }



  setCurrentUser() {
    if (typeof localStorage !== 'undefined') {
      const user: any = JSON.parse(localStorage.getItem('user')!);
      if (user) {
        this.userService.setCurrentUser(user);
      }
    }
  }
}
