import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {



  constructor(
    private toastr: ToastrService,
    public userService : UserService,
    private router: Router
  ) {}


  ngOnInit() {
    this.CreateAccount();
  }

  CreateAccount() {
    this.userService.CreateAccount()
  }

}
