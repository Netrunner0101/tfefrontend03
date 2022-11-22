import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Warehouse} from "../Models/Warehouse";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  id: undefined | number ;

  private url = url_dev;

  constructor(
    private http:HttpClient,
    private snackBar: MatSnackBar
    ) { }

  showError(error:any ): void {
    this.snackBar.open(error, 'X', {panelClass: ['error']});
  }

  AllWarehouse():Observable<Warehouse>{
    return this.http.get<Warehouse>(this.url+'/api/Warehouse/warehouses');
  }

  getById(id_warehouse:any):Observable<Warehouse>{
    return this.http.get<Warehouse>(this.url+'/api/Warehouse/warehouses/'+id_warehouse);
  }

  create(warehouse:any){
    try{
      this.http.post(this.url+'/api/Warehouse',warehouse).subscribe(
        (response) =>{
          console.log(response)
        }
      );
    }catch (e) {
      console.log("Error");
    }
  }

  update(id_warehouse:any,warehouse:any){
    try{
      this.id = Number(id_warehouse) ;
      this.http.put(this.url+'/api/Warehouse/'+this.id,warehouse).subscribe(
        (response) =>{
          window.location.reload();
          console.log(response);
        }
      );
    }catch (e) {
      let error = e ;
      console.log("Error");
      this.showError(error);
    }
  }

  delete(id_warehouse:any){
    try{
      this.http.delete(this.url+'/api/Warehouse/'+id_warehouse,{}).subscribe(
        (data:any) =>{
          window.location.reload();
          console.log(data)
        }
      );
    }catch (e) {
      console.log("Error");
    }
  }
}
