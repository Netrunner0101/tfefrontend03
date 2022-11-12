import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transporter} from "../Models/Transporter";

@Injectable({
  providedIn: 'root'
})
export class TransporterService {

  id: undefined | number ;

  private url = url_dev;

  constructor(private http:HttpClient) { }

  AllTransporter():Observable<Transporter>{
    return this.http.get<Transporter>(this.url+'/api/Transporter/transporters');
  }


  TransporterById(id_transporter:any):Observable<Transporter>{
    return this.http.get<Transporter>(this.url+'/api/Transporter/transporters/'+id_transporter);
  }

  create(transporter:any){
    this.http.post(this.url+'/api/Transporter',transporter).subscribe(
      (response) =>{
        console.log(response)
      }
    );
  }

  update(id_transporter:any,transporter:any){
    this.id = Number(id_transporter) ;
    this.http.put(this.url+'/api/Transporter/'+this.id,transporter).subscribe(
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
