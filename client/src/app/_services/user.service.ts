import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Account } from '../_models/Account';
import { ToastrService } from 'ngx-toastr';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:5001/users';

  private currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser;

  constructor(private http : HttpClient, private toastr: ToastrService,
  ) { }


  setCurrentUser(user: any) {
    this.currentUser.next(user);
  }

  getAccounts() {
    const userData = JSON.parse(localStorage.getItem('user') ?? '');
    const id = userData.id;
    return this.http.get<Account[]>(this.baseUrl + '/user/'+id);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + '/Login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.next(user);
        }
      })
    );
  }


  CreateAccount() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return throwError(() => new Error('Bruger kan ikke findes'));
    }

    const userData: { id: number } = JSON.parse(userJson);
    let params = new HttpParams().set('userId', userData.id.toString());

    console.log('Creating account with userId:', userData.id);

    return this.http.post('https://localhost:5001/Account/create-account', null, { params });
  }

  TransferMoney(model : any){
    return this.http.post('https://localhost:5001/users/transfer', model, { responseType: 'text' }).pipe(
      map((response: string) => {
        this.toastr.success(response);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error));
      })
    );
  }

}
