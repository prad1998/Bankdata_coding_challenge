import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
model: any = {};
login() {
throw new Error('Method not implemented.');
}

  constructor(
    private toastr: ToastrService,
    public userService : UserService,
  ) {}

  ngOnInit() {

  }

  transfer() {
    this.userService.TransferMoney(this.model).subscribe(
      (response: any) => {
       console.log(response);
      },
      (_error: any) => {
        console.log(_error)
        this.toastr.error(_error);
      }

    );
  }

}
