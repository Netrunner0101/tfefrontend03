import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Customer} from "../Models/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private url = url_dev;

  id: undefined | number ;

  constructor(private http:HttpClient, private router:Router) { }

  AllCustomer():Observable<Customer>{
    return this.http.get<Customer>(this.url+'/api/Customer/customers');
  }

  CustomerById(id_customer:any):Observable<Customer>{
    return this.http.get<Customer>(this.url+'/api/Customer/customers/'+id_customer);
  }

  create(customer:any){
    this.http.post(this.url+'/api/Customer',customer).subscribe(
      (response) =>{
        console.log(response)
      }
    );
  }

  update(id_customer:any,customer:any){
    this.id = Number(id_customer) ;
    this.http.put(this.url+'/api/Customer/'+this.id,customer).subscribe(
      (response) =>{
        window.location.reload();
        console.log(response);
      }
    );
  }

  delete(id_customer:any){
    this.http.delete(this.url+'/api/Customer/'+id_customer,{}).subscribe(
      (data:any) =>{
        console.log(data)
      }
    );
  }
}
