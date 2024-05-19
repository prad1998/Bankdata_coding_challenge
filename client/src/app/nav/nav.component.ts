import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(
    public user: UserService,
    private router: Router
  ) {}
  
  logout() {
    localStorage.removeItem('user');
    this.user.logout();
  }

}
