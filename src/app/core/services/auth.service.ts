import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginUser } from '../domain/login.user';
import { systemConstants } from '../common/system.constants';

import {  Observable, throwError } from 'rxjs';
import { catchError, retry,tap } from 'rxjs/operators';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
    getUser(){
      return JSON.parse(localStorage.getItem(systemConstants.CURRENT_USER)||'');
    }

  Login( email:any,password:any):Observable<LoginUser>{
    let data={
      email:email,
      password:password,
    }
    return this.http.post<LoginUser>(`${systemConstants.BASE_API}/api/User/Login`,data).pipe(
      tap(
        (data:any)=>{
          localStorage.setItem(systemConstants.CURRENT_USER,JSON.stringify(data))
        },
        (error:any)=>console.log(error),
      )
    )
  }
  LogOut(){
    localStorage.removeItem(systemConstants.CURRENT_USER)
  }


  isAuthenticated():boolean{
    if(localStorage.getItem(systemConstants.CURRENT_USER)) return true
    return false
  }

  getLoginUser(){
    let user:LoginUser
    if (this.isAuthenticated()){
     user= new LoginUser(this.getUser().access_token,this.getUser().UserId,this.getUser().Email,this.getUser().Name,this.getUser().Avatar,this.getUser().Address,this.getUser().PhoneNumber)
    }
    else user=null as any
    return user
  }
}
