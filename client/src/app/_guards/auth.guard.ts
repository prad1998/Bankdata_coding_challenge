import { CanActivateFn } from '@angular/router';
import { UserService } from '../_services/user.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(UserService);
  const toastr = inject(ToastrService);

  return user.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        toastr.error('Du skal logge på for at se siden');
        return false;
      }
    })
  );
};
