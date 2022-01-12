import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(
    private DataService:DataService,
    private AuthService: AuthService,
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const that = this
      return new Promise((resolve, reject) => {
        this.DataService.GET('api/PermisionAction/GetActionUser?id=' + this.AuthService.getUser().UserId).subscribe(
          (res: any) => {
            var actions = res.map((r: any) => r.actionCode)
            var newUrl = ''
            if (state.url.split('/').length >= 5) {
              let url: any[] = state.url.split('/')
              url.pop()
              newUrl = url.map((r: any) => r).join('/')
            }
            else {
              newUrl= state.url
            }
            resolve(actions.indexOf(newUrl))
          }
        )
      })
        .then(function (res: any) {
          if (res != -1) {
            return true
          }
          else {
            that.router.navigate(['main/403'])
            return false

          }
        })
  }

}
