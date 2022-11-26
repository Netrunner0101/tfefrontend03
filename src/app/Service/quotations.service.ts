import { Injectable } from '@angular/core';
import {url_dev} from "../global";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Quotations} from "../Models/Quotations";

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {

  id: undefined | number ;

  private url = url_dev;

  constructor(private http:HttpClient) { }

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

  getAll():Observable<Quotations>{
    return this.http.get<Quotations>(this.url+'/api/Quotations/quotations');
  }

  getById(id_quotations:any):Observable<Quotations>{
    return this.http.get<Quotations>(this.url+'/api/Quotations/quotations/'+id_quotations);
  }

  create(quotations:any):Observable<any>{
    return this.http.post(this.url+'/api/Quotations',quotations).pipe(
      catchError((this.handleError)
      )
    );
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
