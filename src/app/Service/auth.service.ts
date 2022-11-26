import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = url_dev;
  private isLogged:boolean = false;

  constructor(private http:HttpClient,private router:Router) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  register(user:any){
    return this.http.post(this.url+'/api/Authenticate/register-user',user).pipe(
      catchError((this.handleError)
      )
    );
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
