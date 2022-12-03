import { Injectable } from '@angular/core';
import {url_dev, url_production} from "../global";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Delivery, DeliveryPost} from "../Models/Delivery";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  id: undefined | number ;

  private url = url_dev;

  private url_prod = url_production;

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

  AllDelivery():Observable<Delivery>{
    return this.http.get<Delivery>(this.url_prod+'/api/Delivery/deliveries');
  }

  DeliveryById(id_delivery:any):Observable<Delivery>{
    return this.http.get<Delivery>(this.url_prod+'/api/Delivery/deliveries/'+id_delivery);
  }

  create(delivery:any){
      this.http.post(this.url_prod+'/api/Delivery',delivery).subscribe(
        (response:any) =>{
          console.log(response)
        }
      );
  }

  createNewDelivery(delivery:any):Observable<any>{
    return this.http.post(this.url_prod+'/api/Delivery/newDelivery',delivery).pipe(
      catchError((this.handleError)
      )
    );
  }

  update(id_delivery:any,delivery:any){
    this.id = Number(id_delivery) ;
    return this.http.put(this.url_prod+'/api/Delivery/'+this.id,delivery).subscribe(
      (response) =>{
        window.location.reload();
        console.log(response);
      },
      (error) =>{
        console.log("Error : "+ error);
      }
    );
    /*
    try{
      this.id = Number(id_delivery) ;
      this.http.put(this.url+'/api/Delivery/'+this.id,delivery).subscribe(
        (response) =>{
          window.location.reload();
          console.log(response);
        }
      );
    }catch (e) {
      console.log("Error");
    }
     */
  }

  delete(id_delivery:any){
    try{
      this.http.delete(this.url_prod+'/api/Delivery/'+id_delivery,{}).subscribe(
        (data:any) =>{
          window.location.reload();
          console.log(data)
        }
      );
    }catch (e) {
      console.log("Error");
    }
  }

  updateCustomerFromDelivery(id_delivery:number,id_customer:number){
    try{
      this.http.put(this.url_prod+'/api/Delivery/'+id_delivery+'/Customer/'+id_customer,{}).subscribe(
        (res)=>{
          window.location.reload();
        });
    }catch (e) {
      console.log({ e });
    }
  }

  deleteCustomerFromDelivery(id_delivery:number){
    try{
      this.http.delete(this.url_prod+'/api/Delivery/'+id_delivery+'/Customer').subscribe(
        (res) => {
          window.location.reload();
        }
      );
    }catch (e) {
      console.log({ e });
    }
  }

  updateTransporterFromDelivery(id_delivery:number,id_transporter:number){
    try{
      this.http.put(this.url_prod+'/api/Delivery/'+id_delivery+'/Transporter/'+id_transporter,{}).subscribe(
        (res) =>{
          window.location.reload();
        }
      );
    }catch (e) {
      console.log({ e });
    }
  }

  deleteTransporterFromDelivery(id_delivery:number){
    try{
      this.http.delete(this.url_prod+'/api/Delivery/'+id_delivery+'/Transporter').subscribe(
        (res) => {
          window.location.reload();
        }
      )
    }catch (e) {
      console.log({ e });
    }
  }

  // Warehouse
  updateWarehouseFromDelivery(id_delivery:number,id_warehouse:number){
    try{
      this.http.put(this.url_prod+'/api/Delivery/'+id_delivery+'/Warehouse/'+id_warehouse,{}).subscribe(
        (res) =>{
          window.location.reload();
        }
      );
    }catch (e) {
      console.log({ e });
    }
  }

  deleteWarehouseFromDelivery(id_delivery:number){
    try{
      this.http.delete(this.url_prod+'/api/Delivery/'+id_delivery+'/Warehouse').subscribe(
        (res) => {
          window.location.reload();
        }
      );
    }catch (e) {
      console.log({ e });
    }
  }

}
