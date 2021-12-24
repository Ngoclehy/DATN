import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { systemConstants } from '../common/system.constants';
import { Notification } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private notiService: NotificationService
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth.isAuthenticated() ? `Bearer ${this.auth.getLoginUser().access_token}` : ''
    })
  }

  GET(path: any) {
    return this.http.get(`${systemConstants.BASE_API}/${path}`, this.httpOptions).pipe(
      tap(res => res,
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.error();

          }
        })
    )
  }

  POST(path: any, data: object) {
    return this.http.post(`${systemConstants.BASE_API}/${path}`, data, this.httpOptions).pipe(
      tap(res => res,
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.error();

          }
        })
    )
  }

  PUT(path: any, data: object) {
    return this.http.put(`${systemConstants.BASE_API}/${path}`, data, this.httpOptions).pipe(
      tap(res => res,
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.error();

          }
        })
    )
  }

  DELETE(path: any, key: any, Id: any) {
    return this.http.delete(`${systemConstants.BASE_API}/${path}?${key}=${Id}`, this.httpOptions).pipe(
      tap(res => res,
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.error();

          }
        })
    )
  }

  error() {
    this.router.navigate(['/auth/login'])
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
