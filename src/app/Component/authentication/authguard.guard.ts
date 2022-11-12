import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../Service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate, CanActivateChild {

  constructor(private router:Router, private auth:AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage.getItem('token') != null ){
      this.router.createUrlTree(['../delivery'])
      return true;
    }else{
      this.router.createUrlTree([''])
      return false;
    }
    //this.isLogged = false;
  }
  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): boolean|UrlTree {
    if(sessionStorage.getItem('token') != null ){
      return true;
    }
    else{
      this.router.createUrlTree([''])
      return false;
    }
    //return false;
  }
}
