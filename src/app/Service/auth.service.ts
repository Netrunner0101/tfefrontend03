import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = url_dev;
  private isLogged:boolean = false;

  constructor(private http:HttpClient,private router:Router) { }

  register(user:any){
    this.http.post(this.url+'/api/Authenticate/register-user',user);
  }

  login(user:any){
    this.http.post(this.url+'/api/Authenticate/login',user).subscribe(
      (data:any) =>{
        console.log(data);
        sessionStorage.setItem('token',data.token);
        //this.isLogged = true;
      }
    );
  }

  isLoggedValue(){
    console.log("Islogged value : "+this.isLogged)
    return this.isLogged;
  }

  logout(){
    sessionStorage.removeItem('token')
    return this.router.navigateByUrl('')
  }

}
