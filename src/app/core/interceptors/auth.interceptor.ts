import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Constants } from '../../commons/constants/contants.enum';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../../commons/components/message-modal/message-modal.component';

function openErrorDialog(
  dialog: MatDialog,
  title: string,
  message: string
): void {
  dialog.open(MessageModalComponent, {
    disableClose: false,
    data: {
      title,
      message,
    },
  });
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const dialog = inject(MatDialog);

  let newReq = req;

  // add authorization token if appointment request
  if (!req.url.includes('/auth')) {
    const token = localStorage.getItem(Constants.TOKEN_KEY) || '';
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(newReq).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      openErrorDialog(dialog, err.error.message, '');
      if ([401, 403].includes(err.status)) {
        router.navigate(['auth', 'login']);
      }
      return throwError(() => err);
    })
  );
};
