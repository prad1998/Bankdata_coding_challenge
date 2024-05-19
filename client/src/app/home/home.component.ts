import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  model: any = {};

  constructor(
    private toastr: ToastrService,
    public userService : UserService,
    private router: Router
  ) {}


  login() {
    this.userService.login(this.model).subscribe(
      (response: any) => {
       console.log(response);
       this.router.navigateByUrl('/nav');
      },
      (_error: any) => {
        this.toastr.error('Forkert kode eller brugernavn');
      }
    );
  }

}
