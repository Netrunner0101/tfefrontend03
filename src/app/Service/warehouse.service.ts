import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Warehouse} from "../Models/Warehouse";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  id: undefined | number ;

  private url = url_dev;

  constructor(private http:HttpClient) { }

  AllWarehouse():Observable<Warehouse>{
    return this.http.get<Warehouse>(this.url+'/api/Warehouse/warehouses');
  }

  getById(id_warehouse:any):Observable<Warehouse>{
    return this.http.get<Warehouse>(this.url+'/api/Warehouse/warehouses/'+id_warehouse);
  }

  create(warehouse:any){
    this.http.post(this.url+'/api/Warehouse',warehouse).subscribe(
      (response) =>{
        console.log(response)
      }
    );
  }

  update(id_warehouse:any,warehouse:any){
    this.id = Number(id_warehouse) ;
    this.http.put(this.url+'/api/Warehouse/'+this.id,warehouse).subscribe(
      (response) =>{
        window.location.reload();
        console.log(response);
      }
    );
  }

  delete(id_warehouse:any){
    this.http.delete(this.url+'/api/Warehouse/'+id_warehouse,{}).subscribe(
      (data:any) =>{
        console.log(data)
      }
    );
  }
}
