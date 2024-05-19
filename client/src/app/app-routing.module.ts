import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountsComponent } from './accounts/accounts.component';
import { authGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [authGuard]
  },
  { path: 'accounts',
    component: AccountsComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
