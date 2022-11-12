import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Delivery} from "../Models/Delivery";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {


  id: undefined | number ;

  private url = url_dev;

  constructor(private http:HttpClient,private router:Router) { }

  AllDelivery():Observable<Delivery>{
    return this.http.get<Delivery>(this.url+'/api/Delivery/deliveries');
  }

  DeliveryById(id_delivery:any):Observable<Delivery>{
    return this.http.get<Delivery>(this.url+'/api/Delivery/deliveries/'+id_delivery);
  }

  create(delivery:any){
    this.http.post(this.url+'/api/Delivery',delivery).subscribe(
      (response) =>{
        console.log(response)
      }
    );
  }

  update(id_delivery:any,delivery:any){
    this.id = Number(id_delivery) ;
    this.http.put(this.url+'/api/Delivery/'+this.id,delivery).subscribe(
      (response) =>{
        window.location.reload();
        console.log(response);
      }
    );
  }

  delete(id_delivery:any){
    this.http.delete(this.url+'/api/Delivery/'+id_delivery,{}).subscribe(
      (data:any) =>{
        console.log(data)
      }
    );
  }

  updateCustomerFromDelivery(id_delivery:number,id_customer:number){
    try{
      this.http.put(this.url+'/api/Delivery/'+id_delivery+'/Customer/'+id_customer,{}).subscribe(
        (res)=>{
          window.location.reload();
        });
    }catch (e) {
      console.log({ e });
    }
  }

  deleteCustomerFromDelivery(id_delivery:number){
    try{
      this.http.delete(this.url+'/api/Delivery/'+id_delivery+'/Customer').subscribe(
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
      this.http.put(this.url+'/api/Delivery/'+id_delivery+'/Transporter/'+id_transporter,{}).subscribe(
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
      this.http.delete(this.url+'/api/Delivery/'+id_delivery+'/Transporter').subscribe(
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
      this.http.put(this.url+'/api/Delivery/'+id_delivery+'/Warehouse/'+id_warehouse,{}).subscribe(
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
      this.http.delete(this.url+'/api/Delivery/'+id_delivery+'/Warehouse').subscribe(
        (res) => {
          window.location.reload();
        }
      );
    }catch (e) {
      console.log({ e });
    }
  }

}
