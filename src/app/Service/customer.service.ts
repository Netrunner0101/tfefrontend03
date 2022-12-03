import { Injectable } from '@angular/core';
import {url_dev, url_production} from "../global";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../Models/Customer";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private url = url_dev;

  private url_prod ="https://maniak7410-001-site1.ctempurl.com";

  id: undefined | number ;

  constructor(private http:HttpClient, private router:Router) { }

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

  AllCustomer():Observable<Customer>{
    return this.http.get<Customer>(this.url_prod+'/api/Customer/customers');
  }

  CustomerById(id_customer:any):Observable<Customer>{
    return this.http.get<Customer>(this.url_prod+'/api/Customer/customers/'+id_customer);
  }

  create(customer:any):Observable<any>{
    return this.http.post(this.url_prod+'/api/Customer',customer,this.httpOptions).pipe(
      catchError((this.handleError)
      )
    );
  }

  update(id_customer:any,customer:any){
    this.id = Number(id_customer) ;
    return this.http.put(this.url_prod+'/api/Customer/'+this.id,customer,this.httpOptions).pipe(
      catchError((this.handleError)
      )
    );
    /*
    this.http.put(this.url+'/api/Customer/'+this.id,customer,this.httpOptions).subscribe(
      (response) =>{
        window.location.reload();
        console.log(response);
      },
      (error) =>{
        console.log("Error : "+ error);
      }
    );*/
  }

  delete(id_customer:any){
    this.http.delete(this.url_prod+'/api/Customer/'+id_customer,{}).subscribe(
      (data:any) =>{
        window.location.reload();
        console.log(data)
      },
      (error) =>{
        console.log("Error : "+ error);
      }
    );
  }



}
