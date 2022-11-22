import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quotations} from "../Models/Quotations";

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {

  id: undefined | number ;

  private url = url_dev;

  constructor(private http:HttpClient) { }

  getAll():Observable<Quotations>{
    return this.http.get<Quotations>(this.url+'/api/Quotations/quotations');
  }

  getById(id_quotations:any):Observable<Quotations>{
    return this.http.get<Quotations>(this.url+'/api/Quotations/quotations/'+id_quotations);
  }

  create(quotations:any){
    try{
      this.http.post(this.url+'/api/Quotations',quotations).subscribe(
        (response) =>{
          console.log(response)
        }
      );
    }catch (e) {
      console.log("Error");
    }
  }

  update(id_quotations:any,quotations:any){
    try{
      this.id = Number(id_quotations) ;
      this.http.put(this.url+'/api/Quotations/'+this.id,quotations).subscribe(
        (response) =>{
          window.location.reload();
          console.log(response);
        }
      );
    }catch (e) {
      console.log("Error");
    }
  }

  delete(id_quotations:any){
    try{
      this.http.delete(this.url+'/api/Quotations/'+id_quotations,{}).subscribe(
        (data:any) =>{
          console.log(data)
        }
      );
    }catch (e) {
      console.log("Error");
    }
  }

  updateTransporterFromQuotations(id_quotations:number,id_transporter:number){
    try{
      this.http.put(this.url+'/api/Quotations/'+id_quotations+'/transporter/'+id_transporter,{}).subscribe(
        (res) =>{
          window.location.reload();
        }
      );
    }catch (e) {
      console.log({ e });
    }
  }

  deleteTransporterFromQuotations(id_quotations:number,id_transporter:number){
    try{
      this.http.delete(this.url+'/api/Quotations/'+id_quotations+'/transporter/'+id_transporter).subscribe(
        (res) => {
          window.location.reload();
        }
      )
    }catch (e) {
      console.log({ e });
    }
  }

}
