import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { Account } from '../_models/Account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  accounts : Account[] = [];


  constructor(
    private toastr: ToastrService,
    public userService : UserService,
    private router: Router
  ) {}


  ngOnInit() {
    this.showTable();
  }

  showTable() {
    this.userService.getAccounts().subscribe({
        next: (accounts) => (this.accounts = accounts),
      });

  }



}
